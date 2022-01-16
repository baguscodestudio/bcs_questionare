-- ONLY CHANGE task variable to your liking the rest you can just leave it be
local quiz = {
    task = 'You must answer at least %s correct answer out of %s questions!',
    title = 'License Test',
    description = 'Complete this test to get your Driver License',
    image = 'SIM',
    cancel = 'Cancel',
    next = 'Next',
    question = {
        {
            question = 'Default Question',
            answers = {
                a = 'Answer is this',
                b = 'False',
                c = 'Nope',
                d = 'Not This',
                correct = 'a',
            }
        }
    },
    minimum = 0,
    shuffleQuestions = false
}

local isOpen = false
local status = {}

function tablelength(T)
    local count = 0
    for _ in pairs(T) do count = count + 1 end
    return count
end

RegisterCommand('testquiz', function()
    exports['bcs_questionare']:openQuiz({
        title = 'License Test',
        description = 'Complete this test to get your Driver License',
        image = 'SIM',
        minimum = 1,
        shuffle = false,
    }, {
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
    }, function(correct, questions)
        exports['hud']:sendAlert('Questionare', 'Test Passed! Answered '..correct..' out of '..questions..' question!', 'success', 3000)
        print('success', correct, questions)
    end, function(correct, questions)
        exports['hud']:sendAlert('Questionare', 'Test Failed! Answered '..correct..' out of '..questions..' question!', 'error', 3000)
        print('failed', correct, questions)
    end)
end)

RegisterNUICallback('hideFrame', function(data ,cb)
    Wait(100)
    isOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'closeQuiz',
        data = false
    })
    cb('ok')
end)

exports('openQuiz', function(data, questions, successCb, failedCb)
    quiz.task = string.format(quiz.task, data.minimum, tablelength(questions))
    quiz.title = data.title
    quiz.description = data.description
    quiz.image = data.image
    quiz.minimum = data.minimum
    quiz.shuffleQuestions = data.shuffle
    quiz.questions = questions
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'openQuiz',
        data = {
            questions = quiz,
            display = true
        }
    })
    isOpen = true

    repeat
        Wait(500)
    until not isOpen

    if status.success then
        successCb(status.correct, status.questions)
        status = {}
    elseif status.success == false then
        failedCb(status.correct, status.questions)
        status = {}
    end
end)

RegisterNUICallback('finishQuiz', function(data, cb)
    status.success = data.passed
    status.correct = data.correct
    status.questions = data.questions
    SendNUIMessage({
        action = 'closeQuiz',
        data = false
    })
    cb('ok')
end)