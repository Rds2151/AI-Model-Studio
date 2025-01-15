import os
import sys
import base64
from typing import Dict, List
from dotenv import load_dotenv
from openai import OpenAI
import json

# Load environment variables
load_dotenv()

class ImageAnalyzer:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.model = "gpt-4o-mini"
    
    def encode_image(self, image_path: str) -> str:
        """
        Encode image to base64 string
        """
        try:
            with open(image_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
                return encoded_string
        except FileNotFoundError:
            print(f"Error: Image file not found at path: {image_path}")
            raise
        except Exception as e:
            print(f"Error encoding image: {str(e)}")
            raise

    def first_pass_analysis(self, image_path: str) -> str:
        """
        First pass: Detailed image analysis
        """
        try:
            base64_image = self.encode_image(image_path)
            
            prompt = """
            Analyze only the visible elements in this image and describe:

            VISUAL PROPERTIES:
            - Image format (photo/graphic/artwork/screenshot/document)
            - Notable lighting, colors, or visual effects (if any)
            - Image quality and clarity
            
            MAIN ELEMENTS:
            - Primary subject or focus
            - Key objects or items
            - People (if present): number, general appearance, actions
            - Animals or living things (if present)
            
            SETTING & CONTEXT:
            - Location or environment
            - Time of day/weather conditions (if outdoor scene)
            - Background elements
            
            TECHNICAL DETAILS:
            - Any visible text, numbers, or symbols
            - Interfaces or controls (if digital/technical)
            - Signs, labels, or markers
            
            ACTIVITY/INTERACTION:
            - Actions or events taking place
            - Interactions between elements
            - Purpose or function (if apparent)
            
            Provide only information that can be directly observed in the image. Do not make assumptions about elements that are not clearly visible.
            """

            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}",
                                    "detail": "high"
                                }
                            }
                        ]
                    }
                ],
                max_tokens=500
            )
            
            if not response.choices:
                raise ValueError("No response received from API")
                
            analysis_result = response.choices[0].message.content
            return analysis_result
            
        except Exception as e:
            print(f"Error in first pass analysis: {str(e)}")
            raise

    def second_pass_analysis(self, first_pass_description: str, user_input: str) -> Dict:
        """
        Second pass: Generate questions and answers based on the description and user input
        """
        try:
            prompt = f"""
            Based on this image description:
            {first_pass_description}

            And considering this as user query and context to answer:
            {user_input}

            Please generate 5 more relevant but creative questions and their answers. 
            Format your response as a JSON string with this structure:
            {{
                "questions": [
                    {{"question": "{user_input}", "answer": "answer to user query"}} 
                    {{"question": "Q2", "answer": "A2"}} 
                    {{"question": "Q3", "answer": "A3"}} 
                    {{"question": "Q4", "answer": "A4"}} 
                    {{"question": "Q5", "answer": "A5"}}
                ]
            }}
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=500
            )
            
            if not response.choices:
                raise ValueError("No response received from API")
                
            response_content = response.choices[0].message.content

            formated_response = response_content.strip().replace("```json", "").replace("```", "").strip()
            
            try:
                parsed_response = json.loads(formated_response)
                return parsed_response
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON response: {str(e)}")
                print(f"Raw response: {response_content}")
                raise
            
        except Exception as e:
            print(f"Error in second pass analysis: {str(e)}")
            raise

    def analyze_image(self, image_path: str, user_input: str) -> Dict:
        """
        Complete image analysis process
        """
        try:
            # First pass - detailed description
            description = self.first_pass_analysis(image_path)
            
            # Second pass - questions and answers with user context
            qa_results = self.second_pass_analysis(description, user_input)
            
            return {
                "description": description,
                "questions_and_answers": qa_results["questions"]
            }
            
        except Exception as e:
            error_message = f"Analysis failed: {str(e)}"
            print(f"\nError: {error_message}")
            return {
                "error": error_message
            }

# Main function to handle command-line inputs
if __name__ == "__main__":
    image_path = sys.argv[1]  # First argument: image path
    user_input = sys.argv[2]  # Second argument: user context

    analyzer = ImageAnalyzer()
    result = analyzer.analyze_image(image_path, user_input)

    print(json.dumps(result, indent=4))  # Return the result as JSON

# if __name__ == "__main__":
#     main()