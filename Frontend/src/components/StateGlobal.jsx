import { createGlobalState } from 'react-hooks-global-state'
const { setGlobalState, useGlobalState } = createGlobalState({
      baseUrlBack: 'http://localhost:3001/api/',
      baseHeader :{
            "Accept": `application/json`,
            "Accept-Language": `fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3`,
            "Content-type": `application/json; charset=utf-8`
          }

})
export { useGlobalState, setGlobalState }
