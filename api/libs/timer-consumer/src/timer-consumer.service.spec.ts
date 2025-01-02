import { Test, TestingModule } from '@nestjs/testing';
import { TimerConsumerService } from './timer-consumer.service';

describe('TimerConsumerService', () => {
  let service: TimerConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimerConsumerService],
    }).compile();

    service = module.get<TimerConsumerService>(TimerConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
