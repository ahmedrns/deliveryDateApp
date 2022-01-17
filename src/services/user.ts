import { Service, Inject } from 'typedi';
import {IDeliveryInputDTO} from '@/interfaces/IUser'
import moment from 'moment';
import bigDecimal from 'js-big-decimal'
import { resolve } from 'path';
@Service()
export default class UserService {
  constructor(

  ) {
  }

  public async GetDates(deliveryDetails: IDeliveryInputDTO): Promise<any[]> {
    return new Promise<string[]>((resolve, reject)=>{
      let today = moment().utc().endOf('day').unix();
      let deliveryDates=[]
      let last = bigDecimal.add(today,1209600)  
      deliveryDetails.products.map((elem:any)=>{
        let advanceDays = bigDecimal.multiply(elem.DaysInAdvance,86400)
        last = bigDecimal.subtract(last,advanceDays)
        let diffDays = bigDecimal.subtract(last,today)
        
        let number_of_days:number= Number(bigDecimal.divide(diffDays,86400,0))
        for(let i=1;i<=number_of_days;i++){
          let deliveryDay = moment().add(i,'days')
          
          
          let dayName = moment(deliveryDay).format('dddd')
        
          elem.DeliveryDays.map((e)=>{
            if(e==dayName){
              let day =deliveryDay.format('YYYY-MM-DD')
              deliveryDates.push(day)
            }
          })
        }
      })      
      resolve(deliveryDates)
    })
}
}

