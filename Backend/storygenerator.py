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
            "You are an expert AI assistant who explains AI/ML topics in simple terms for beginners. "
            "you can look at the history of the conversation to understand the context. "
            "use the fewshortprompts to understand how to answer any question  which starts below"
        )

        examples = [
            {
                "input": "What is a neural network?",
                "output": "A neural network is a machine learning model inspired by the brain. It learns patterns in data using layers of artificial neurons.",
            },
            {
                "input": "What is a vector database?",
                "output": "A vector database stores information as vectors (arrays of numbers). It helps find similar items—like matching text or images.\n"
                 "Few short prompts end \n ",
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

        user_prompt = HumanMessagePromptTemplate.from_template("History ends . This is your main query {question}")
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