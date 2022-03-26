import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from 'accounts/accounts.service';
import { Address, Bucket, Image, Profile, User } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JWTAuthGuard } from 'auth/auth.guard';
import { GetUser } from 'auth/get-user-decorator';

@Controller('/v1/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JWTAuthGuard)
  @Get('/me')
  async findProfile(@GetUser() user: User): Promise<Profile> {
    return this.accountsService.findProfileByUser(user);
  }

  @UseGuards(JWTAuthGuard)
  @Patch('/me/update')
  async updateProfile(
    @GetUser() user: User,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.accountsService.updateProfile(user, updateProfileDto);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/addresses')
  async findProfileAddresses(@GetUser() user: User): Promise<Address[]> {
    return this.accountsService.findProfileAddresses(user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/images')
  async findProfileImages(@GetUser() user: User): Promise<Image[]> {
    return this.accountsService.findProfileImages(user);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('/image/:id')
  async deleteImage(@GetUser() user: User, id: number): Promise<void> {
    if (await this.accountsService.isImageOwner(id, user)) {
      throw new BadRequestException('');
    }
    return this.accountsService.deleteImage(id);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/buckets')
  async findProfileBuckets(@GetUser() user: User): Promise<Bucket[]> {
    return this.accountsService.findProfileBucketLists(user);
  }

  @UseGuards(JWTAuthGuard)
  @Put('/bucket/:id')
  async changeBucketStatus(@GetUser() user: User, id: number): Promise<Bucket> {
    if (await this.accountsService.isBucketOwner(id, user)) {
      throw new BadRequestException('');
    }
    return this.accountsService.changeBucketStatus(id);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/shops')
  async findShops(@GetUser() user: User): Promise<Bucket[]> {
    return this.accountsService.findProfileShoppingLists(user);
  }
}
