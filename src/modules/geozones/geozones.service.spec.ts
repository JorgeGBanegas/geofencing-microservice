import { Test, TestingModule } from '@nestjs/testing';
import { GeozonesService } from './geozones.service';

describe('GeozonesService', () => {
  let service: GeozonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeozonesService],
    }).compile();

    service = module.get<GeozonesService>(GeozonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
