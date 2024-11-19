local currentQuiz = {}
local passedTest = nil

---@param show boolean
function ToggleFrame(show)
    SetNuiFocus(show, show)
    SendNUIMessage({
        action = "setVisible",
        data = show
    })
    SendNUIMessage({
        action = "initUI",
        data = UILocale
    })
end

---@param page string
function SetPage(page)
    SendNUIMessage({
        action = "setPage",
        data = page
    })
end

RegisterNUICallback("hideFrame", function(data, cb)
    ToggleFrame(false)
    if passedTest and currentQuiz then
        passedTest:resolve(false, 0, currentQuiz.home.max)
    end
    cb("ok")
end)

--- Data Validation function
---@param questions {id: number, question: string, answers: {id: string, answer?: string, image?: string}[], image?:string}[]
function DataValidation(questions)
    for i = 1, #questions do
        if questions[i].answers and type(questions[i].answers) ~= 'table' then
            print('[QUESTIONARE] ERROR MISMATCH TYPE, EXPECTED array table FOR answer')
            return false
        elseif questions[i].image and type(questions[i].image) ~= 'string' then
            print('[QUESTIONARE] ERROR MISMATCH TYPE, EXPECTED STRING FOR image')
            return false
        elseif not questions[i].id then
            print('[QUESTIONARE] ERROR NULL id')
            return false
        elseif not questions[i].question then
            print('[QUESTIONARE] ERROR NULL question')
            return false
        else
            for j = 1, #questions[i].answers do
                local answer = questions[i].answers[j]
                if not answer.answer and not answer.image then
                    print('[QUESTIONARE] ERROR answer OR image MUST NOT BE NULL')
                    return false
                elseif answer.answer and type(answer.answer) ~= "string" then
                    print('[QUESTIONARE] ERROR answer MUST BE STRING TYPE')
                elseif answer.image and type(answer.image) ~= "string" then
                    print('[QUESTIONARE] ERROR image MUST BE STRING TYPE')
                end
            end
        end
    end
    return true
end

exports('StartQuiz', function(home, questions)
    currentQuiz = {}
    currentQuiz.home = home
    currentQuiz.home.max = #questions
    currentQuiz.quiz = questions

    if not DataValidation(questions) then
        return false
    end

    passedTest = nil
    passedTest = promise.new()

    ToggleFrame(true)
    SetPage('question')
    Wait(100)

    SendNUIMessage({
        action = 'setHomeQuestionare',
        data = currentQuiz.home
    })

    return Citizen.Await(passedTest)
end)

RegisterNUICallback('getQuestion', function(id, cb)
    for i = 1, #currentQuiz.quiz do
        if i == tonumber(id) then
            cb(currentQuiz.quiz[i])
            break
        end
    end
end)

RegisterNUICallback('completeTest', function(answers, cb)
    local correct = 0

    for id, answer in pairs(answers) do
        for i = 1, #currentQuiz.quiz do
            local data = currentQuiz.quiz[i]
            if data.id == id then
                if data.correct == answer then
                    correct += 1
                end
            end
        end
    end

    local min, max = currentQuiz.home.minimum, currentQuiz.home.max
    passedTest:resolve(correct >= min, correct, max)
    passedTest = nil
    currentQuiz = {}
    ToggleFrame(false)
    cb('ok')
end)
