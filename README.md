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

```
exports['bcs_questionare']:openQuiz(data, questions, onsuccesscb, onfailedcb)
```

The data variable contains of these properties

| Properties       | Type    | Description                                                     |
| ---------------- | ------- | --------------------------------------------------------------- |
| title            | string  | Title shown at the beginning                                    |
| description      | string  | Description shown at the beginning                              |
| image (optional) | string  | Image shown at the beginning. Format must be in `imagename`.png |
| minimum          | number  | Minimum correct answer to pass the test                         |
| shuffle          | boolean | Whether to randomize the question order or not                  |

The questions is an array of question object that has these properties

| Properties | Type   | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| question   | string | The question                                  |
| answers    | object | Has answers and the correct answer properties |

#### Example usage

```lua
local questions = {
    {
        question = 'Default Question 1',
        answers = {
            a = 'Answer is this',
            b = 'False',
            c = 'Nope',
            d = 'Not This',
            correct = 'a',
        }
    },
    {
        question = 'Default Question 2',
        answers = {
            a = 'Answer is this',
            b = 'False',
            c = 'Nope',
            d = 'Not This',
            correct = 'a',
        }
    },
    {
        question = 'Default Question 3',
        answers = {
            a = 'Answer is this',
            b = 'False',
            c = 'Nope',
            d = 'Not This',
            correct = 'a',
        }
    },
    {
        question = 'Default Question 4',
        answers = {
            a = 'Answer is this',
            b = 'False',
            c = 'Nope',
            d = 'Not This',
            correct = 'a',
        }
    }
}

exports['bcs_questionare']:openQuiz({
    title = 'License Test',
    description = 'Complete this test to get your Driver License',
    image = 'SIM',
    minimum = 1,
    shuffle = false,
}, questions, function(correct, questions)
    -- exports['hud']:sendAlert('Questionare', 'Test Passed! Answered '..correct..' out of '..questions..' question!', 'success', 3000)
    print('success', correct, questions)
end, function(correct, questions)
    -- exports['hud']:sendAlert('Questionare', 'Test Failed! Answered '..correct..' out of '..questions..' question!', 'error', 3000)
    print('failed', correct, questions)
end)
```

Add your image in html/images folder as a png, then you can just show the image using the image property in the data parameter

### Support
Is available in my discord (No need to create a ticket) or you can create an issue here
https://discord.gg/caa7xt2d8G

## Contributing

Contributions are always welcome!
