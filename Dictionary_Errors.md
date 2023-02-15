# For build

## Build Error occurred

### Build optimization failed: found page without a React Component as default export in ${PATH}
<img width="1155" alt="image" src="https://user-images.githubusercontent.com/53039583/218906797-fb3e87d5-1275-485c-92f8-1b81076dca8f.png">
- :mag: 원인
  : ${PATH} 경로에서 import 한 컴포넌트 중 **export default** 구문이 없는 스크립트 파일이 존재하여 발생하였다. 즉, 위 캡쳐의 경로인 `pages/config/powerSumConfig` 에서 최근에 import 된 `deviceCategoryForPowerSumConfig()`, `deviceTypesForPowerSumConfig` 가 정의된 컴포넌트 `./config/powerSumConfig.ts` 내부에
  `export default` 구문이 누락되어 발생한 것이다.
    nextJS 의 page 컴포넌트에서 직접 종속되는 컴포넌트들은 반드시 export default 구문으로 컴포넌트를 export 해야만 한다.
- :hammer: 솔루션
  : 따라서 `./config/powerSumConfig.ts` 컴포넌트 내부에서 가장 메인 역할을 하는 `deviceCategoryForPowerSumConfig()` 함수를 export default 하도록 수정했더니 빌드가 정상적으로
  진행되었다.
  
