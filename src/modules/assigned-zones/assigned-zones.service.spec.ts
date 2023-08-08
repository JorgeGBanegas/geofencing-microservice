import { Test, TestingModule } from '@nestjs/testing';
import { AssignedZonesService } from './assigned-zones.service';

describe('AssignedZonesService', () => {
  let service: AssignedZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedZonesService],
    }).compile();

    service = module.get<AssignedZonesService>(AssignedZonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
