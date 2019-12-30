export class Regx{ 
    static Name(control){
        let regx= /^[a-zA-Z]+((['. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        // let alphabetsWithSpaceDot = /^[a-zA-Z .]*{2,100}$*/;
        let valid = regx.test(control.value);

        return valid ?null: {name:true}
}

}
   
