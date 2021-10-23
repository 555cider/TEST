# 예비창업자를 위한 서울시 상권 분석 서비스

- 서울시에서 창업을 희망하는 예비창업자를 대상으로 한 서비스
- 창업에 앞서 필요한 상권분석 정보를 쉽고 간편하게 얻을 수 있는 서비스

## 프로젝트 구성 안내

- `예비창업자의 쉽고 간편한 정보 획득을 목표로 구성`
- `서울시 일반음식점 인허가 정보를 활용하여 검색, 지역, 업종, 상호 등 세부 조건에 따라 필요한 정보 제공 서비스`

## 프로젝트 소개

### 1. 개요

- 서울시 요식업 예비창업자에게, 상권분석에 필요한 정보 제공
- 지역별 메뉴별 업체 분포 정보를 가공하여, 간편한 조작으로 살펴볼 수 있게 함
- 간편한 요약랭킹으로 지역별 음식점 랭킹 정보를 제공하여 창업을 위한 상권분석에 도움을 더함

### 2. 진행

- 주제 선정  
  : (앨리스 측에서) 프로젝트의 주제로 `배달 서비스 분석`을 선정

- 대상 구체화  
  : 위 서비스와 관련하여, 가장 수요가 높을 것이라 예상되는 `예비창업자`를 서비스 이용자로 선정

- 현실적 제약  
  : 습득 가능한 데이터의 제한으로 인해, `경쟁 업체 분포`로 주제를 제한

- 구체적인 구현 논의  
  : 관련 정보를 `어떠한 형태`로, 얼마나 `구체적인 정보`를 제시해야 하는가

### 3. 기술

- 데이터  
  : 서울시 일반음식점 인허가 정보(<https://data.seoul.go.kr/dataList/OA-16094/A/1/datasetView.do;jsessionid=F64EF0EE3383EA9A6CD3009A73448EB6.new_portal-svr-21>)
- 기술 스택  
  : python, javascript, MongoDB 등
- 라이브러리(순차적으로 제거 예정)  
  : dashboard.js, c3.js

### 4. 기능

- 특정 지역을 정한 예비창업자: 특정 지역 내에 어떤 업종이 가장 많거나 적은지 탐색 가능
- 특정 업종을 정한 예비창업자: 특정 업종이 유행하는 지역, 소외된 지역 탐색 가능

### 5. 구성도

![story_board](/static/img/story_board.png)

### 6. 팀원 역할 분담

| 이름 | 담당 업무   |
| ---- | ----------- |
| 국** | 데이터 분석 |
| 김** | 프론트엔드  |
| 본인 | 백엔드      |

#### 1. 데이터분석(국**)

- 기획 단계: 주제 선정, 기획서 작성
- 개발 단계: 태블로 활용한 데이터 분석 및 시각화
- 수정 단계: 피드백 반영, 발표준비

#### 2. 프론트엔드(김**)

- 기획 단계: 주제 선정, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 구현, UI 디자인 완성, 세부 페이지 구성
- 수정 단계: 피드백 반영, 발표준비 및 발표

#### 3. **백엔드(본인)**

- 기획 단계: 주제 선정, 스토리보드 작성
- 개발 단계: 데이터 전처리, DB 임포트 및 연결, 프론트엔드와의 데이터 송수신, 서버 배포
- 수정 단계: 피드백 반영, 데이터 차트화
