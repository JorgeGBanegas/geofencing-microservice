import { Test, TestingModule } from '@nestjs/testing';
import { AssignedZonesController } from './assigned-zones.controller';

describe('AssignedZonesController', () => {
  let controller: AssignedZonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignedZonesController],
    }).compile();

    controller = module.get<AssignedZonesController>(AssignedZonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
