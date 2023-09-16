import { EventType } from "./DomainEvent/Event/EventType";
import { IPublishSubscribeService } from "./DomainEvent/IPublishSubscribeService";
import { PublishSubscribeService } from "./DomainEvent/PublishSubscribeService";
import { MachineRefillSubscriber } from "./DomainEvent/Subscriber/MachineRefillSubscriber";
import { MachineSaleSubscriber } from "./DomainEvent/Subscriber/MachineSaleSubscriber";
import { StockWarningSubscriber } from "./DomainEvent/Subscriber/StockWarningSubscriber";
import { Machine } from "./Entity/Machine";
import { IMachineRepository } from "./Repository/IMachineRepository";
import { MachineRepository } from "./Repository/MachineRepository";
import { eventGenerator } from "./helpers";

(async () => {

  // create repository then add 3 machine
  const machineRepository: IMachineRepository = new MachineRepository();
  machineRepository.add(new Machine('001', 3));
  machineRepository.add(new Machine('002', 3));
  machineRepository.add(new Machine('003', 3));
  
  // set threshold for warning
  const stockQuantityThreshold = 3;

  // create the PubSub service
  const pubSubService: IPublishSubscribeService = new PublishSubscribeService();

  // create a saleSubscriber. inject PublishSubscribeService, stockQuantityThreshold and MachineRepository.
  const saleSubscriber = new MachineSaleSubscriber(pubSubService, stockQuantityThreshold, machineRepository);
  pubSubService.subscribe(EventType.SALE, saleSubscriber);

  // create a refillSubscriber. inject PublishSubscribeService, stockQuantityThreshold and MachineRepository.
  const refillSubscriber = new MachineRefillSubscriber(pubSubService, stockQuantityThreshold, machineRepository);
  pubSubService.subscribe(EventType.REFILL, refillSubscriber);

  // create a warning event subscriber. inject MachineRepository
  const warningSubscriber = new StockWarningSubscriber(machineRepository);
  pubSubService.subscribe(EventType.NOTIFY, warningSubscriber);

  // create 5 random events
  const events = [1, 2, 3, 4, 5].map(i => eventGenerator());

  // publish the events
  events.map(pubSubService.publish.bind(pubSubService));
})();
