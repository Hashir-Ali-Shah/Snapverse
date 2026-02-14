import os
from langchain_groq import ChatGroq
from langchain_core.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate,
    FewShotChatMessagePromptTemplate,
)
from langchain_core.messages import HumanMessage, AIMessage

class CaptionGenerator:
    def __init__(self, temperature: float = 0.3):
        self.llm = ChatGroq(
            model="llama3-70b-8192",
            temperature=temperature,
            api_key=os.getenv("GROQ_API_KEY"),
            streaming=False,  # We don't need streaming for caption generation
        )
        self.chat_prompt = self._build_prompt()

    def _build_prompt(self):
        system_prompt = SystemMessagePromptTemplate.from_template(
            "You are a caption generator expert whose only task is to analyze conversations and generate concise, descriptive topic names.\n"
            "Your job is to read the entire conversation and identify the main theme or subject being discussed.\n"
            "The topic name should be:\n"
            "- Clear and descriptive (2-5 words maximum)\n"
            "- Capture the main subject of the conversation\n"
            "- Use title case (e.g., 'Neural Networks Discussion')\n"
            "- Be specific but not too lengthy\n"
            "You should return ONLY the topic name, nothing else.\n"
            "If the conversation is unclear or covers multiple unrelated topics, choose the most prominent theme.\n"
            "If somebody asks for something other than topic generation, respond with 'I am a caption generator and can only generate topic names for conversations.'\n"
        )

        examples = [
            {
                "input": """Conversation:
                Teacher: I've been reading about neural networks, but I'm still not sure how they actually learn.
                Student: They learn by adjusting weights between neurons based on the error between predicted and actual outputs.
                Teacher: So it's just math behind the scenes?
                Student: Exactly—linear algebra for the calculations, and calculus for optimization.
                Teacher: And more layers mean better learning?
                Student: Not always—more layers can help, but too many can cause overfitting.""",
                "output": "Neural Networks Learning"
            },
            {
                "input": """Conversation:
                Doctor: How have you been feeling lately?
                Patient: Pretty good, doctor, but I've been hearing about something called vector databases—what are they?
                Doctor: They're databases designed to store and search high-dimensional vectors, often used for AI and machine learning.
                Patient: So instead of rows and columns, they store… vectors?
                Doctor: Exactly—think of each vector as a numerical fingerprint for text, images, or audio.""",
                "output": "Vector Databases Explanation"
            },
            {
                "input": """Conversation:
                Person A: I'm thinking about starting a small garden in my backyard.
                Person B: That's a great idea! What kind of vegetables are you planning to grow?
                Person A: Maybe some tomatoes, lettuce, and carrots to start with.
                Person B: Those are perfect for beginners. Make sure you have good soil drainage.
                Person A: Should I start with seeds or seedlings?
                Person B: For your first garden, I'd recommend seedlings—they're more forgiving.""",
                "output": "Backyard Gardening Tips"
            },
            {
                "input": """Conversation:
                User: What's the weather like today?
                Assistant: I don't have access to real-time weather data, but I can help you find weather information.
                User: How about cooking recipes?
                Assistant: I'd be happy to help with cooking recipes! What type of cuisine are you interested in?
                User: Maybe some Italian pasta dishes?
                Assistant: Great choice! I can suggest some classic Italian pasta recipes.""",
                "output": "Italian Cooking Discussion"
            }
        ]

        example_prompt = ChatPromptTemplate.from_messages([
            HumanMessagePromptTemplate.from_template("{input}"),
            AIMessagePromptTemplate.from_template("{output}"),
        ])

        few_shot_prompt = FewShotChatMessagePromptTemplate(
            example_prompt=example_prompt,
            examples=examples
        )

        user_prompt = HumanMessagePromptTemplate.from_template(
            "Please analyze this conversation and generate a topic name:\n\n{conversation}\n\n"
            "Return only the topic name, nothing else."
        )

        return ChatPromptTemplate.from_messages([
            system_prompt,
            few_shot_prompt,
            user_prompt,
        ])

    def generate_caption(self, conversation: str, conversation_id: str) -> str:
        """
        Generate a topic name for the given conversation and return it with the ID.
        
        Args:
            conversation (str): The full conversation text
            conversation_id (str): Unique identifier for the conversation
            
        Returns:
            str: Topic name formatted as "topicname_id"
        """
        try:
            messages = self.chat_prompt.format_messages(conversation=conversation)
            response = self.llm.invoke(messages)
            
            # Clean up the response to ensure it's just the topic name
            topic_name = response.content.strip()
            
            # Remove any quotes or extra formatting
            topic_name = topic_name.replace('"', '').replace("'", "")
            
            # Replace spaces with underscores for the final format
            topic_formatted = topic_name.replace(' ', '_')
            
            # Return in the requested format: topicname_id
            return f"{topic_formatted}_{conversation_id}"
            
        except Exception as e:
            # Fallback in case of any error
            return f"Conversation_{conversation_id}"

    def generate_topic_only(self, conversation: str) -> str:
        """
        Generate only the topic name without ID (useful for testing or other purposes).
        
        Args:
            conversation (str): The full conversation text
            
        Returns:
            str: Just the topic name
        """
        try:
            messages = self.chat_prompt.format_messages(conversation=conversation)
            response = self.llm.invoke(messages)
            return response.content.strip().replace('"', '').replace("'", "")
        except Exception as e:
            return "General Conversation"


if __name__ == "__main__":
    # Example usage
    caption_gen = CaptionGenerator()
    
    sample_conversation = """
    User: Can you explain what machine learning is?
    Assistant: Machine learning is a subset of AI where computers learn patterns from data without being explicitly programmed.
    User: What's the difference between supervised and unsupervised learning?
    Assistant: Supervised learning uses labeled data to make predictions, while unsupervised learning finds patterns in data without labels.
    User: Can you give me an example of each?
    Assistant: Sure! Email spam detection is supervised learning, while customer segmentation is unsupervised learning.
    """
    
    result = caption_gen.generate_caption(sample_conversation, "12345")
    print(f"Generated caption: {result}")
    
    # Test topic-only generation
    topic_only = caption_gen.generate_topic_only(sample_conversation)
    print(f"Topic only: {topic_only}")