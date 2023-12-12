export class Simulate {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;

    this.$target = document.createElement('section');
    this.$target.className = 'simulate';
    this.$target.innerHTML = `
    <button class='simulate-btn' type='button'>시뮬</button>
    <div class='simulate-result'></div>
  `;

    $app.appendChild(this.$target);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    document.querySelector('.simulate-result').innerHTML = this.state;
  }
}

// function senario(problem, day) {
//   return fetch(`https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/competition-imgs/2021kakao/problem${problem}_day${day}.json`)
//     .then(res => res.json())
//     .then(response => JSON.stringify(response))
//     .catch(error => console.log(error));
// }

/*
  시나리오 1(problem = 1)
    - 서비스 지역의 크기: 5X5
    - 자전거 대여 요청 빈도: 분당 요청 수 평균 2건
    - 자전거 수: 100대. 각 자전거 대여소에는 초기에 자전거가 4대씩 있음
    - 트럭 수: 5대
*/
