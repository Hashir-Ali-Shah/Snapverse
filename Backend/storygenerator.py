from langchain_groq import ChatGroq
from langchain_core.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate,
    FewShotChatMessagePromptTemplate,
)
from langchain_core.messages import HumanMessage

class StoryGenerator:
    def __init__(self, api_key: str, temperature: float = 0.7):
        self.llm = ChatGroq(
            model="llama3-70b-8192",
            temperature=temperature,
            api_key=api_key,
            streaming=True,
        )
        self.chat_prompt = self._build_prompt()

    def _build_prompt(self):
        # System behavior
        system_prompt = SystemMessagePromptTemplate.from_template(
            "You are an expert AI assistant who explains AI/ML topics in simple terms for beginners."
        )

        # Few-shot examples
        examples = [
            {
                "input": "What is a neural network?",
                "output": "A neural network is a machine learning model inspired by the brain. It learns patterns in data using layers of artificial neurons.",
            },
            {
                "input": "What is a vector database?",
                "output": "A vector database stores information as vectors (arrays of numbers). It helps find similar items—like matching text or images.",
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

        user_prompt = HumanMessagePromptTemplate.from_template("{question}")

        return ChatPromptTemplate.from_messages([
            system_prompt,
            few_shot_prompt,
            user_prompt,
        ])

    def explain(self, question: str) -> str:
        messages = self.chat_prompt.format_messages(question=question)
        response = self.llm.invoke(messages)
        return response.content



if __name__ == "__main__":
    explainer = StoryGenerator(api_key="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")
    answer = explainer.explain("What is LangChain?")
    print(answer)