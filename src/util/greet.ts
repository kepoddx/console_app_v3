import colors from 'colors';
import figlet from 'figlet';


export function greet(msg: string): void {
    console.log(colors.green(figlet.textSync(msg, {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })))
}