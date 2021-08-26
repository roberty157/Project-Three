import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faDollarSign, faSearch } from "@fortawesome/free-solid-svg-icons";
import BannerCard from "./BannerCard";
const BannerIntro = () => {
  let bannerCards = [
    {
      headerIcon: <FontAwesomeIcon icon={faSearch} />,
      title: "Search",
      text: "US City"
    },
    {
      headerIcon: <FontAwesomeIcon icon={faDollarSign} />,
      title: "Analyze",
      text: "Quality of Life Ratings"

    },
    {
      headerIcon: <FontAwesomeIcon icon={faCity} />,
      title: "Compare",
      text: "Sign Up to Compare Cities"

    }
  ];
    return (
        <div className="row my-5 justify-content-between p-5">
          {bannerCards.map(bannerCard => <BannerCard {...bannerCard} />)}
        </div>
    )
}

export default BannerIntro;