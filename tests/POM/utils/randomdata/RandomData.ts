
export class RandomData{

   static getRandomNumber(min: number, max: number){
        return Math.floor(Math.random() * (max - min) + min);
    }

    static getRandomName(user: string){
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 4) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
        }
        return user+result;
    }

    static getRandomEmail(user: string){
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 4) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
        }
        return `${user+result}@email.com`;
    }
}