from langchain_groq import ChatGroq
from langchain_core.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate,
    FewShotChatMessagePromptTemplate,
    MessagesPlaceholder
)
from langchain_core.messages import HumanMessage,AIMessage

class StoryGenerator:
    def __init__(self, temperature: float = 0.7):
        self.llm = ChatGroq(
            model="llama3-70b-8192",
            temperature=temperature,
            api_key="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",
            streaming=True,
        )
        self.chat_prompt = self._build_prompt()
        self.history=[]

    def _build_prompt(self):

        system_prompt = SystemMessagePromptTemplate.from_template(
            "You are story generator expert whose only task it to generate conversation between 2 characters based on user input .\n "
            "you can look at the history of the conversation to understand the context.\n "
            "use the fewshortprompts to understand how to answer any question  which starts below\n"
            "your output should start directly from coversation and end on conversation and should not contain any other text.\n"
            "if somebody asks a question other than conversation then you should answer with 'I am story generator expert and I can only generate conversation between 2 characters based on user input.'\n"
           
        )

        examples = [
            {
                "input": "generate a conversation between a teacher and a student about neural networks",
                "output": """I’ve been reading about neural networks, but I’m still not sure how they actually learn.
                They learn by adjusting weights between neurons based on the error between predicted and actual outputs.
                So it’s just math behind the scenes?
                Exactly—linear algebra for the calculations, and calculus for optimization.
                And more layers mean better learning?
                Not always—more layers can help, but too many can cause overfitting.
                Oh, so we have to balance complexity and accuracy.
                Right, and that’s why we use techniques like regularization and dropout.
                Makes sense. I guess the “magic” is just well-tuned math.
                Exactly—magic until you understand the math.""",
            },
            {
                "input": "give me a conversation between a doctor and a patient about vector databases",
                "output": """How have you been feeling lately?
                            Pretty good, doctor, but I’ve been hearing about something called vector databases—what are they?
                            They’re databases designed to store and search high-dimensional vectors, often used for AI and machine learning.
                            So instead of rows and columns, they store… vectors?
                            Exactly—think of each vector as a numerical fingerprint for text, images, or audio.
                            And the database can find similar ones quickly?
                            Yes, using similarity search methods like cosine similarity or Euclidean distance.
                            That sounds like it could help in medical research.
                            It does—imagine instantly finding patient cases similar to yours.
                            Wow, so it’s like a memory for AI. """,
            },
        ]

        example_prompt = ChatPromptTemplate.from_messages([
            HumanMessagePromptTemplate.from_template("{input}"),
            AIMessagePromptTemplate.from_template("{output}"),
        ])

        few_shot_prompt = FewShotChatMessagePromptTemplate(
            example_prompt=example_prompt,
            examples=examples
        )

        user_prompt = HumanMessagePromptTemplate.from_template("History ends . This is your main query {question} Make sure to give output directly and dont say something like here is your output or conversation")
        history_intro = SystemMessagePromptTemplate.from_template("Below is the chat history.")


        return ChatPromptTemplate.from_messages([
            system_prompt,
            few_shot_prompt,
            history_intro,
            MessagesPlaceholder(variable_name="history"),   
            user_prompt,
        ])

    def generate(self, question: str) -> str:
        messages = self.chat_prompt.format_messages(question=question,history=self.history)
        response = self.llm.invoke(messages)
        self.history.append(HumanMessage(content=question))
        self.history.append(AIMessage(content=response.content))
        return response.content



if __name__ == "__main__":
    explainer = StoryGenerator()
    answer = explainer.generate("What is LangChain?")
    print(answer)