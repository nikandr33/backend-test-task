class CoreController {
    constructor() {
        // Получение списка квестов в переменную
        CoreController.userQuest = CoreController.getQuests();
        
        // Прокрутка спинов 12 раз
        for (let i = 0; i < 12; i++) {
            console.log(' ');
            console.log('Спин №' + parseInt(i+1));
            CoreController.spin();
        }
    }

    get matrix() {
        return this._matrix;
    }

    set matrix(value) {
        if(value !== undefined && typeof value === 'array')
            this._matrix = value;
    }

    // Проверка матрицы на выигрыш
    static checkMatrixForWins() {
        for (let i = 0; i < CoreController.ROWS; i++)
            for (let j = i; j < CoreController.MATRIX_SIZE; j+=3)
                if (this.matrix[j] === this.matrix[j+3])
                    return true;

        return false;
    }

    // Вывод матрицы
    static printMatrix() {
        console.log('Результат спина:');

        let strMatrix = '';
        for (let i = 0; i < CoreController.ROWS; i++) {
            for (let j = i; j < CoreController.MATRIX_SIZE; j+=3)
                strMatrix += this.matrix[j] + ' ';
            strMatrix += '\n';
        }

        console.log(strMatrix);
    }
    
    static spin() {
        const spinResult = this.getSpinResult();
        this.matrix = spinResult.matrix;

        this.printMatrix();

        const spinStatus = this.checkMatrixForWins() ? 'Выигрыш!' : 'Поражение...';
        console.log(spinStatus)

        // Подсчет выполнения квестов
        for (let i = 0; i < CoreController.userQuest.length; i++) {
            let quest = CoreController.userQuest[i];

            if (quest.questType === 'do_spin' && !quest.isCompleted) {

                quest.userQuestValue++;
                if (quest.questValue === quest.userQuestValue) {
                    quest.isCompleted = true;
                    quest.dateCompleted = new Date();
                    console.log("Выполнен квест: Совершить спин 12 раз");
                }

            } else if (quest.questType === 'spent_money' && !quest.isCompleted) {

                quest.userQuestValue += spinResult.spentMoney;
                if (quest.questValue === quest.userQuestValue) {
                    quest.isCompleted = true;
                    quest.dateCompleted = new Date();
                    console.log("Выполнен квест: Потратить 2000 монет");
                }

            } else if (quest.questType === 'combo_row' && !quest.isCompleted) {

                for (let i = 0; i < CoreController.ROWS; i++)
                    for (let j = i; j < CoreController.MATRIX_SIZE; j+=3)
                        if (this.matrix[j-3] === this.matrix[j] && this.matrix[j] === this.matrix[j+3])
                            quest.userQuestValue++;
                if (quest.questValue === quest.userQuestValue) {
                    quest.isCompleted = true;
                    quest.dateCompleted = new Date();
                    console.log("Выполнен квест: Выбить в матрице комбо из 3 символов 2 раза");
                }

            } else if (quest.questType === 'get_symbol' && !quest.isCompleted) {

                for (let i = 0; i < CoreController.ROWS; i++)
                    for (let j = i; j < CoreController.MATRIX_SIZE; j+=3)
                        if (this.matrix[j] === CoreController.uniq_symbol) 
                            quest.userQuestValue++;
                if (quest.questValue === quest.userQuestValue) {
                    quest.isCompleted = true;
                    quest.dateCompleted = new Date();
                    console.log("Выполнен квест: Выбить в матрице уникальный символ");
                }

            }
        }
    }

    static getQuests() {
        return [
            {
                id: 1,
                userId: 1,
                questType: 'do_spin',
                questValue: 12,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            },
            {
                id: 1,
                userId: 1,
                questType: 'spent_money',
                questValue: 2000,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            },
            {
                id: 1,
                userId: 1,
                questType: 'combo_row',
                questValue: 2,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            },
            {
                id: 1,
                userId: 1,
                questType: 'get_symbol',
                questValue: 1,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            }
        ]
    }

    static getSpinResult() {
        return {
            matrix: [1, 3, 7, 2, 3, 5, 6, 3, 4, 7, 2, 71, 9, 9, 4],
            spentMoney: 1000,
        }
    }
}


CoreController.userQuest = [];

// Уникальный символ
CoreController.uniq_symbol = 71;

// Размеры матрицы
CoreController.COLUMNS = 5;
CoreController.ROWS = 3;
CoreController.MATRIX_SIZE = CoreController.COLUMNS * CoreController.ROWS;

const cc = new CoreController();

module.exports = CoreController;