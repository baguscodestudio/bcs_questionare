# BCS Questionare

This allows for easy exports and callbacks for configurable quizes or tests.

## Features

- Easy export and simple clean ui
- 0.00 ms (duh its a nui)

## Documentation

To use the exports it has 2 parameters

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
  - shuffle?: `boolean`
    - Do you want to shuffle the questions?

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
    shuffle = true,
}

local function GenerateQuestions()
    local tempArr = {}
    local corrects = ['a', 'b', 'c', 'd']
    for i=1, 4 do
        tempArr[#tempArr+1] = {
            id = i,
            image = 'url',
            question = 'Default Question '..i,
            correct = corrects[math.random(1,4)],
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
            }
        }
    end
    return tempArr
end

local questions = GenerateQuestions()

local result = exports['bcs_questionare']:StartQuiz(home, questions)
if result then
    local mistakes = result.max - result.result
    print(('passed the test with %s mistakes'):format(mistakes))
else
    print('failed the test')
end
```

### Support

Is available in my discord (Don't create a ticket) or you can create an issue here
https://discord.gg/92JZmrMMez

## Contributing

Contributions are always welcome!
