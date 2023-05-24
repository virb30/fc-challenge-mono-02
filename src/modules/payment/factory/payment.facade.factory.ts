import PaymentFacade from "../facade/payment.facade";
import PaymentFacadeInterface from "../facade/payment.facade.interface";
import TransactionRepository from "../repository/transaction.repository"
import ProcessPaymentUsecase from "../usecase/process-payment/process.payment.usecase";

export default class PaymentFacadeFactory {

    static create(): PaymentFacadeInterface {
        const transactionRepository = new TransactionRepository();
        const processPaymentUsecase = new ProcessPaymentUsecase(transactionRepository);
        return new PaymentFacade(processPaymentUsecase);
    }


}