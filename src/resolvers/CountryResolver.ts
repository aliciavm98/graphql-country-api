import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

@Resolver(Country)
export class CountryResolver {
  private countryRepository: Repository<Country>;

  constructor() {
    if (AppDataSource.isInitialized) {
      this.countryRepository = AppDataSource.getRepository(Country);
    } else {
      throw new Error("Data Source is not initialized");
    }
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    return await this.countryRepository.findOne({ where: { code } });
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continent") continent: string
  ): Promise<Country[]> {
    return await this.countryRepository.find({ where: { continent } });
  }

  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Country> {
    const country = this.countryRepository.create({
      code,
      name,
      emoji,
      continent,
    });
    return await this.countryRepository.save(country);
  }
}
