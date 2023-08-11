import { Test, TestingModule } from '@nestjs/testing';
import { AnimesaverController } from './animesaver.controller';

describe('AnimesaverController', () => {
  let controller: AnimesaverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimesaverController],
    }).compile();

    controller = module.get<AnimesaverController>(AnimesaverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
