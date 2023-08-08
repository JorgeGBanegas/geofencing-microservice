import { Test, TestingModule } from '@nestjs/testing';
import { GeozonesController } from './geozones.controller';

describe('GeozonesController', () => {
  let controller: GeozonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeozonesController],
    }).compile();

    controller = module.get<GeozonesController>(GeozonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
