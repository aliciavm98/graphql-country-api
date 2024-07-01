import { AppDataSource } from "./data-source";
import { Country } from "./entities/Country";

async function loadFixtures() {
  const countryRepository = AppDataSource.getRepository(Country);

  const countries = [
    { code: "FR", name: "France", emoji: "🇫🇷", continent: "Europe" },
    { code: "BE", name: "Belgique", emoji: "🇧🇪", continent: "Europe" },
    { code: "AN", name: "Andorre", emoji: "🇦🇩", continent: "Europe" },
    // Ajoutez plus de pays ici si nécessaire
  ];

  for (const country of countries) {
    const existingCountry = await countryRepository.findOne({
      where: { code: country.code },
    });
    if (!existingCountry) {
      await countryRepository.save(country);
    }
  }

  console.log("Fixtures loaded!");
}

loadFixtures()
  .then(() => {
    console.log("Fixtures successfully loaded");
  })
  .catch((error) => {
    console.error("Error loading fixtures:", error);
  });
