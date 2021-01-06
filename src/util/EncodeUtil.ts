
import _ from 'lodash'

export const encodeComma = (text: string) => {
  try{
    const splitText = text.split(',');
    const returnText = splitText.join("|")
    return returnText
  }catch(e){
  }
}

export const decodeComma = (text: string) => {
  try{
    const splitText = text.split('|');
    const returnText = splitText.join(",")
    return returnText
  }catch(e){
  }
}

export const covertTagToObject = (data) => {
  return _.assign({}, ...data.map( p => {
      const lang = p.split("-")
      return {
        [lang[0]] : decodeComma(lang[1])  
      }
    })
  )
}
