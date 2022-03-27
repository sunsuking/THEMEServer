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
import { Address, Bucket, Image, Profile, Review, User } from '@prisma/client';
import { UpdateProfileDto } from 'accounts/dto/update-profile.dto';
import { JWTAuthGuard } from 'auth/auth.guard';
import { GetUser } from 'auth/get-user-decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts API')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiOperation({
    summary: '로그인된 사용자 계정 정보 조회',
    description: 'JWT 토큰으로 로그인된 사용자의 Profile 조회한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Get('/me')
  async findProfile(@GetUser() user: User): Promise<Profile> {
    return this.accountsService.findProfileByUser(user);
  }

  @ApiOperation({
    summary: '로그인된 사용자 계정 정보 수정',
    description: 'JWT 토큰으로 로그인된 사용자의 Profile 변경하는데 사용한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Patch('/me/update')
  async updateProfile(
    @GetUser() user: User,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.accountsService.updateProfile(user, updateProfileDto);
  }

  @ApiOperation({
    summary: '로그인된 사용자 배송지 정보들 조회',
    description: 'JWT 토큰으로 로그인된 사용자의 배송지 정보들을 조회한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Get('/addresses')
  async findProfileAddresses(@GetUser() user: User): Promise<Address[]> {
    return this.accountsService.findProfileAddresses(user);
  }

  @ApiOperation({
    summary: '로그인된 사용자 업로드 이미지들 조회',
    description:
      'JWT 토큰으로 로그인된 사용자의 업로드 이미지 조회들 조회한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Get('/images')
  async findProfileImages(@GetUser() user: User): Promise<Image[]> {
    return this.accountsService.findProfileImages(user);
  }

  @ApiOperation({
    summary: '로그인된 사용자 업로드 이미지 삭제',
    description: 'JWT 토큰으로 로그인된 사용자의 업로드 이미지를 삭제한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Delete('/image/:id')
  async deleteImage(@GetUser() user: User, id: number): Promise<void> {
    if (await this.accountsService.isImageOwner(id, user)) {
      throw new BadRequestException('');
    }
    return this.accountsService.deleteImage(id);
  }

  @ApiOperation({
    summary: '로그인된 사용자 계정 작성 리뷰들 조회',
    description: 'JWT 토큰으로 로그인된 사용자가 작성한 리뷰들을 조회한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Get('/reviews')
  async findMyReviewsByUser(@GetUser() user: User): Promise<Review[]> {
    return this.accountsService.findMyReviewsByUser(user);
  }

  @ApiOperation({
    summary: '로그인된 사용자 계정 스크랩 리뷰들 조회',
    description: 'JWT 토큰으로 로그인된 사용자가 스크랩한 리뷰들을 조회한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Get('/reviews/scrapped')
  async findScrappedReviewsByUser(
    @GetUser() user: User,
  ): Promise<{ scrapedReviews: Review[] }> {
    return this.accountsService.findScrappedReviewsByUser(user);
  }

  @ApiOperation({
    summary: '로그인된 사용자 계정 좋아요 리뷰들 조회',
    description: 'JWT 토큰으로 로그인된 사용자가 좋아요한 리뷰들을 조회한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Get('/reviews/liked')
  async findLikedReviewsByUser(
    @GetUser() user: User,
  ): Promise<{ likedReviews: Review[] }> {
    return this.accountsService.findLikedReviewsByUser(user);
  }

  @ApiOperation({
    summary: '로그인된 사용자 계정 위시리스트 조회',
    description: 'JWT 토큰으로 로그인된 사용자의 위시리스트 조회한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Get('/buckets')
  async findProfileBuckets(@GetUser() user: User): Promise<Bucket[]> {
    return this.accountsService.findProfileBucketLists(user);
  }

  @ApiOperation({
    summary: '로그인된 사용자 계정 위시리스트 변경(장바구니로)',
    description:
      'JWT 토큰으로 로그인된 사용자의 위시리스트 물품을 장바구니로 이동한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Put('/bucket/:id')
  async changeBucketStatus(@GetUser() user: User, id: number): Promise<Bucket> {
    if (await this.accountsService.isBucketOwner(id, user)) {
      throw new BadRequestException('');
    }
    return this.accountsService.changeBucketStatus(id);
  }

  @ApiOperation({
    summary: '로그인된 사용자 계정 장바구니 조회',
    description: 'JWT 토큰으로 로그인된 사용자의 장바구니를 조회한다.',
  })
  @UseGuards(JWTAuthGuard)
  @Get('/shops')
  async findShops(@GetUser() user: User): Promise<Bucket[]> {
    return this.accountsService.findProfileShoppingLists(user);
  }
}
