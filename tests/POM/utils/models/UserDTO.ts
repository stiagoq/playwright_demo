export class UserDTO{
    private name: string
    private lastname: string
    private email : string
    private documentNumber : string
    private phoneNumber : string

    constructor(name:string, lastname:string, email:string, documentNumber:string, phoneNumber:string){
        this.name = name
        this.lastname = lastname
        this.email = email
        this.documentNumber = documentNumber
        this.phoneNumber = phoneNumber
    }

    public setName(name: string){
        this.name = name
    }

    public getName(){
        return this.name 
    }

    public setLastname(lastname: string){
        this.lastname = lastname
    }

    public getLastname(){
        return this.lastname 
    }

    public setEmail(email: string){
        this.email = email
    }

    public getEmail(){
        return this.email 
    }

    public setDocumentNumber(documentNumber: string){
        this.documentNumber = documentNumber
    }

    public getDocumentNumber(){
        return this.documentNumber 
    }

    public setPhonetNumber(phoneNumber: string){
        this.phoneNumber = phoneNumber
    }

    public getPhoneNumber(){
        return this.phoneNumber 
    }

}