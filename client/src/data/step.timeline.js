const test = [
  // This is test[0]
  [
    {
      step: "1 - Human Chat",
      description: "Chatgpt Write your Question or Prompt in the input box.",
    },
    {
      step: "1 - AI Magic",
      description: "Chatgpt Wait for the API to generate the response.",
    },
    {
      step: "1 - Human Chat",
      description: "Chatgpt you can see the response in the output box.",
    },
    {
      step: "1 - AI Magic",
      description:
        "Chatgpt you can ask the bot to generate a response to your prompt.",
    },
  ],
  // This is test[1]
  [
    {
      step: "2 - Human Chat",
      description:
        "Ai Art Write your Prompt in the input box and click on the generate button.",
    },
    {
      step: "2 - AI Magic",
      description: "AI Art Wait for the API to generate the response.",
    },
    {
      step: "2 - Human Chat",
      description: "AI Art you can see the generated image in the output box.",
    },
    {
      step: "2 - AI Magic",
      description:
        "AI Art you can ask the bot to generate a image to your prompt.",
    },
  ],
];

export default test;

//! I want to access the data in this way
// First component is test[0][index]
// console.log(test[0][0].step);
// console.log(test[0][0].description);
// console.log(test[0][1].step);
// console.log(test[0][1].description);
// console.log(test[0][2].step);
// console.log(test[0][2].description);
// console.log(test[0][3].step);
// console.log(test[0][3].description);


//! Second component is test[1][index]
// console.log(test[1][0].step);
// console.log(test[1][0].description);
// console.log(test[1][1].step);
// console.log(test[1][1].description);
// console.log(test[1][2].step);
// console.log(test[1][2].description);
// console.log(test[1][3].step);
// console.log(test[1][3].description);
