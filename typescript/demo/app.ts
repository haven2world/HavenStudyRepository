
interface Solution{
  readonly output: String
}

class CheckIsInArray implements Solution {
  constructor(){
    
    enum Color {
      Red,
      Black,
      White
    }

    let colors: Color[] = [Color.Black, Color.Black, Color.White];

    this.isInArray(Color.Black, colors, (res)=>{
      console.log(res);
      this.output = res.toString();
    })
  }
  output = ''
  protected isInArray<T>(target: T, array: T[], callback?: (result: Boolean)=> void): Boolean{
    let flag: boolean = false;
    array.forEach(item=>{
      if(item === target){
        flag = true;
      }
    });
    if(callback){
      callback(flag);
    }
    return flag;
  }

}

let test: Solution = new CheckIsInArray();




