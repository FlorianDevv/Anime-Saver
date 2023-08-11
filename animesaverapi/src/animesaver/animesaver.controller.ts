import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './anime.entity';
import { AnimeSave } from './animesave.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('animesaver')
export class AnimesaverController {
  constructor(
    @InjectRepository(Anime)
    private readonly animeRepository: Repository<Anime>,
    @InjectRepository(AnimeSave)
    private readonly animeSaveRepository: Repository<AnimeSave>,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Anime[]> {
    return this.animeRepository.find();
  }

  @Post()
  async create(@Body() anime: Anime): Promise<Anime> {
    return this.animeRepository.save(anime);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('users/animes')
  async findAnimeSaveByUserId(@Request() request: Request): Promise<any> {
    const userId = request['user'].id;
    return this.animeSaveRepository
      .createQueryBuilder('animeSave')
      .innerJoinAndSelect('animeSave.anime', 'anime')
      .select([
        'anime.title',
        'anime.image',
        'animeSave.comment',
        'animeSave.rating',
        'animeSave.animeId',
      ])
      .where('animeSave.userId = :userId', { userId })
      .getMany();
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('users/animes/:animeId/save')
  async createAnimeSave(
    @Body() animeSave: { comment: string; rating: number },
    @Request() request: Request,
    @Param('animeId') animeId: number,
  ): Promise<AnimeSave> {
    const userId = request['user'].id;
    const existingAnimeSave = await this.animeSaveRepository.findOne({
      where: { userId, animeId },
    });
    if (existingAnimeSave) {
      throw new Error('Already like !');
    }

    const newAnimeSave = new AnimeSave();
    newAnimeSave.userId = userId;
    newAnimeSave.animeId = animeId;
    newAnimeSave.comment = animeSave.comment;
    newAnimeSave.rating = animeSave.rating;
    return this.animeSaveRepository.save(newAnimeSave);
  }

  // checkAnimeSaver (if user already save anime)
  @UseGuards(AuthGuard('jwt'))
  @Get('users/animes/:animeId/check')
  async checkAnimeSave(
    @Request() request: Request,
    @Param('animeId') animeId: number,
  ): Promise<boolean> {
    const userId = request['user'].id;

    const existingAnimeSave = await this.animeSaveRepository.findOne({
      where: { userId, animeId },
    });

    if (existingAnimeSave) {
      return true;
    }

    return false;
  }

  //EDIT ANIMESAVER
  @UseGuards(AuthGuard('jwt'))
  @Patch('users/animes/:animeId/edit')
  async editAnimeSaver(
    @Request() request: Request,
    @Param('animeId') animeId: number,
    @Body() animeSave: { comment: string; rating: number },
  ): Promise<AnimeSave> {
    const userId = request['user'].id;
    const existingAnimeSave = await this.animeSaveRepository.findOne({
      where: { userId, animeId },
    });
    if (!existingAnimeSave) {
      throw new Error('Save not found !');
    }
    existingAnimeSave.comment = animeSave.comment;
    existingAnimeSave.rating = animeSave.rating;
    return this.animeSaveRepository.save(existingAnimeSave);
  }

  // deleteAnimeSaver
  @UseGuards(AuthGuard('jwt'))
  @Post('users/animes/:animeId/delete')
  async deleteAnimeSave(
    @Request() request: Request,
    @Param('animeId') animeId: number,
  ): Promise<void> {
    const userId = request['user'].id;
    const existingAnimeSave = await this.animeSaveRepository.findOne({
      where: { userId, animeId },
    });
    if (!existingAnimeSave) {
      throw new Error('Save not found !');
    }
    await this.animeSaveRepository.remove(existingAnimeSave);
  }
}
