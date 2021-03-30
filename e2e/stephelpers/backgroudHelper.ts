export class BackgroudHelper {
    public static  executed = false;
    static async executionSet(executedAttirbute: boolean) {
        BackgroudHelper.executed = executedAttirbute;
    }

    static async executionReturn() {
        return BackgroudHelper.executed;
    }
}
