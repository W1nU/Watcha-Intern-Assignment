
# Watcha 인턴 선발 2차 구현과제

이 프로그램은 프로그래머스 SummerCoding 참여 회사인 Watcha의 인턴 선발 구현과제입니다. 

확인주소 : http://watcha-intern.s3-website.ap-northeast-2.amazonaws.com/

## 과제 내용

 과제: Redux 혹은 MobX를 이용한 빙고 구현

### 조건

- React를 사용할 것
- Redux 혹은 MobX를 사용할 것

### 목적

- Redux, MobX, React 같은 framework, library를 사용하는 이유, 설계 의의를 이해하고 그에 맞게 코드를 작성할 수 있는가
- application state를 Redux 혹은 MobX에 맞게 설계할 수 있는가
- React component를 적절히 나눌 수 있는가

다음은 이 과제의 목적이 아닙니다.

- 스타일 작업

### 구현 상세

화면에는 다음과 같은 내용이 표시됩니다.

- 게임 (재)시작 버튼
- 1P용 5x5 빙고판과 완성 줄 표시 목록
- 2P용 5x5 빙고판과 완성 줄 표시 목록

#### 게임의 시작

1. 처음에 빙고판의 내용은 비어있으며, cell을 눌러도 반응하지 않습니다.
2. '게임 시작'을 누르면 빙고판마다 1에서 25까지의 숫자가 임의로 배치됩니다.
3. '게임 시작' 버튼은 '게임 재시작'으로 텍스트가 바뀝니다.
4. 이후 '게임 재시작' 버튼을 누르면 완성 줄 목록이 초기화되며, 빙고판은 2의 상태로 돌아갑니다. (숫자는 새롭게 채워짐)

#### 게임의 진행

1. 게임이 시작되면 1P부터 번갈아가며 cell을 클릭할 수 있습니다. (자기 차례가 아닌데 cell을 클릭할 경우 '잘못된 차레입니다.' 알림이 뜹니다.)
2. cell을 클릭하면 모든 빙고판에서 해당하는 숫자에 특정한 표시를 합니다.
3. 빙고판에서 가로, 세로, 대각선으로 다섯개의 cell이 연달아 표시된 경우, 완성 줄 목록에 완성된 순서로 표기합니다.
4. 5줄을 완성한 플레이어가 생기면, 결과에 따라 '1/2P가 빙고를 완성했습니다.', '무승부입니다.' 알림이 뜹니다. 확인을 누르면 UI가 완전히 초기화됩니다.



## 구현 사항

1. 게임 (재)시작 버튼 - 화면의 상단 중간에 2개의 버튼이 있습니다. 하나는 게임 (재)시작 버튼, 하나는 종료 버튼입니다. 게임 시작 버튼을 누르면 게임이 시작되고, 게임이 시작되면 재시작으로 버튼의 텍스트가 변경됩니다. 종료 버튼은 게임 시작 전에 누르게 되면 게임을 먼저 시작하라는 알람이 뜨면서, 작동을 하지 않습니다.

2. 5x5 빙고판과 완성 줄 표시 목록 - 화면의 중단과 하단에 두명의 플레이어를 위한 빙고판과 완료한 줄이 표시되는 테이블이 존재합니다. 

3. 처음에 빙고판의 내용은 비어있으며, cell을 눌러도 반응하지 않습니다. - 각 셀들이 게임이 시작중일 때만 onClick 메소드가 포함되어 렌더링 되므로 게임이 시작하기 전에는 작동하지 않습니다.

4. '게임 시작'을 누르면 빙고판마다 1에서 25까지의 숫자가 임의로 배치됩니다. - 게임을 시작하면 우선 각각의 플레이어의 숫자 배열이 생성되고 이 배열을 랜덤으로 섞은 후 테이블에 표시되게 됩니다. 

5. '게임 시작' 버튼은 '게임 재시작'으로 텍스트가 바뀝니다. - 1번 참고

6. 이후 '게임 재시작' 버튼을 누르면 완성 줄 목록이 초기화되며, 빙고판은 2의 상태로 돌아갑니다. (숫자는 새롭게 채워짐) - 게임 재시작 버튼을 누르게되면 게임 시작 함수가 호출되고 시작 함수 내부에서 모든 설정값을 다시 초기화 되게 됩니다.

7. 게임이 시작되면 1P부터 번갈아가며 cell을 클릭할 수 있습니다. (자기 차례가 아닌데 cell을 클릭할 경우 '잘못된 차례입니다.' 알림이 뜹니다.) - 1P 부터 게임이 진행되며, 자기 차례가 아닐시 오류메시지를 나타내고 클릭이벤트가 동작하지 않습니다. 

8. cell을 클릭하면 모든 빙고판에서 해당하는 숫자에 특정한 표시를 합니다. - 셀을 클릭하게 되면, 해당 숫자의 셀에 1P, 2P 모두 회색 배경이 칠해지게 됩니다. 한번 클릭한 타일은 다시 클릭할 수 없습니다. 

9. 빙고판에서 가로, 세로, 대각선으로 다섯개의 cell이 연달아 표시된 경우, 완성 줄목록에 완성된 순서로 표기합니다. - 빙고 라인을 완성한 순서대로 하단의 표에 나타나게 됩니다. 

10. 5줄을 완성한 플레이어가 생기면, 결과에 따라 '1/2P가 빙고를 완성했습니다.', '무승부입니다.' 알림이 뜹니다. 확인을 누르면 UI가 완전히 초기화됩니다. - 5줄 이상을 승리조건으로 보고 5줄 이상을 먼저 도달하는 플레이어가 이겼다는 알람이 뜹니다. 또한 동시에 5줄 이상에 도달한 경우 무승부가 됩니다.

## 사용기술

```
JavaScript
React
Mobx
```



