// 로또 번호 추첨 프로그램

class LotteryGame {
    constructor() {
        this.drawBtn = document.getElementById('drawBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.numbersContainer = document.getElementById('numbersContainer');
        this.bonusNumber = document.getElementById('bonusNumber');
        this.resultMessage = document.getElementById('resultMessage');
        
        this.selectedNumbers = [];
        this.bonus = null;
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.drawBtn.addEventListener('click', () => this.drawLottery());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    // 1~45 사이의 무작위 정수 생성
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 로또 번호 추첨 (중복 없이 6개)
    generateNumbers() {
        const numbers = new Set();
        
        while (numbers.size < 6) {
            numbers.add(this.getRandomNumber(1, 45));
        }
        
        // 번호를 오름차순으로 정렬
        return Array.from(numbers).sort((a, b) => a - b);
    }

    // 보너스 번호 생성 (메인 번호와 중복되지 않아야 함)
    generateBonus(mainNumbers) {
        let bonus;
        do {
            bonus = this.getRandomNumber(1, 45);
        } while (mainNumbers.includes(bonus));
        
        return bonus;
    }

    // 로또 추첨 실행
    drawLottery() {
        this.drawBtn.disabled = true;
        this.drawBtn.textContent = '추첨 중...';
        
        // 애니메이션 효과를 위해 로드 시뮬레이션
        setTimeout(() => {
            this.selectedNumbers = this.generateNumbers();
            this.bonus = this.generateBonus(this.selectedNumbers);
            
            this.displayNumbers();
            this.showResultMessage();
            
            this.drawBtn.disabled = false;
            this.drawBtn.textContent = '🎲 번호 추첨하기';
        }, 1000);
    }

    // 번호 표시
    displayNumbers() {
        this.numbersContainer.innerHTML = '';
        
        // 메인 6개 번호 표시
        this.selectedNumbers.forEach(number => {
            const numberBall = document.createElement('div');
            numberBall.className = 'number-ball';
            numberBall.textContent = number;
            numberBall.style.animationDelay = `${this.selectedNumbers.indexOf(number) * 0.1}s`;
            this.numbersContainer.appendChild(numberBall);
        });
        
        // 보너스 번호 표시
        this.bonusNumber.innerHTML = `
            <span class="bonus-label">+</span>
            <span class="bonus-ball">${this.bonus}</span>
        `;
        this.bonusNumber.style.display = 'flex';
    }

    // 결과 메시지 표시
    showResultMessage() {
        const numbers = this.selectedNumbers.join(', ');
        this.resultMessage.textContent = `선택된 번호: ${numbers} / 보너스: ${this.bonus}`;
        this.resultMessage.style.display = 'block';
    }

    // 초기화
    reset() {
        this.selectedNumbers = [];
        this.bonus = null;
        this.numbersContainer.innerHTML = '';
        this.bonusNumber.innerHTML = '';
        this.bonusNumber.style.display = 'none';
        this.resultMessage.textContent = '';
        this.resultMessage.style.display = 'none';
    }
}

// DOM이 로드되면 프로그램 실행
document.addEventListener('DOMContentLoaded', () => {
    new LotteryGame();
});
