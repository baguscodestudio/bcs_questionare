# BCS Questionare

This allows for easy exports and callbacks for configurable quizes or tests.
![2022-01-16 11-41-50](https://user-images.githubusercontent.com/60974759/149651916-276197c1-f8ce-4a88-bb5a-a39e905237eb.gif)

## Features

- Easy export and simple clean ui
- 0.00 ms (duh its a nui)

## Preview

![Preview1](https://media.discordapp.net/attachments/856060200011038762/932165513595981834/Questionare.png?width=810&height=464)
![Preview2](https://media.discordapp.net/attachments/856060200011038762/932165513906389082/Questionare2.png?width=810&height=464)

## Documentation

To use the exports it has 4 parameters

```lua
local result = exports['bcs_questionare']:StartQuiz(home, questions)
```

- **home**: `table (object)`

  - minimum: `number`
    - Minimum correct questions to pass the test
  - title: `string`
    - Title of the test
  - subtitle: `string`
    - Subtitle of the test
  - description: `string`
    - Description of the test
  - image: `string (url)`
    - Link of the image
  - passed?: `string`
    - End title to show after passing the test
  - failed?: `string`
    - End title to show after failign the test

- **questions**: `table (array)`
  - id: `number`
  - image?: `string (url)`
  - question: `string`
    - The question
  - **answers**: `table (array & object)`
    - id: `string`
    - answer?: `string`
    - image?: `string (url)`
    - correct: `string (id)`

#### Example usage

```lua
local home = {
    minimum = 1,
    passed = 'You have passed the test',
    failed = 'You failed the test',
    title = 'Theory Car',
    subtitle = 'A license test',
    description = 'Lorem ipsum dolor sit amet',
    image = 'url',
}

local function GenerateQuestions()
    local tempArr = {}
    local corrects = ['a', 'b', 'c', 'd']
    for i=1, 4 do
        tempArr[#tempArr+1] = {
            id = i,
            image = 'url',
            question = 'Default Question '..i,
            answers = {
                {
                    id='a',
                    answer = 'Answer is this',
                    image = 'url'
                },
                {
                    id='b',
                    answer = 'breh',
                    image = 'url'
                },
                {
                    id = 'c',
                    answer = 'False Dahek',
                    image = 'url'
                },
                {
                    id = 'd',
                    answer = 'Not wut',
                    image = 'url'
                }
                correct = corrects[math.random(1,4)],
            }
        }
    end
    return tempArr
end

local questions = GenerateQuestions()

local result = exports['bcs_questionare']:StartQuiz(home, questions)
if result then
    print('passed the test')
else
    print('failed the test')
end
```

### Support

Is available in my discord (Don't create a ticket) or you can create an issue here
https://discord.gg/92JZmrMMez

## Contributing

Contributions are always welcome!
