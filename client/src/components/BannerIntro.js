import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faCity, faSearch } from "@fortawesome/free-solid-svg-icons";
import BannerCard from "./BannerCard";
const BannerIntro = () => {
  let bannerCards = [
    {
      headerIcon: <FontAwesomeIcon icon={faSearch} />,
      title: "Search",
      text: "Search for U.S. cities to find population statistics and quality of life scores."
    },
    {
      headerIcon: <FontAwesomeIcon icon={faChartBar} />,
      title: "Analyze",
      text: "Get healthcare, taxation, education, housing, cost of living, safety, environmental quality & economy scores."

    },
    {
      headerIcon: <FontAwesomeIcon icon={faCity} />,
      title: "Compare",
      text: "See how your home city compares with your possible future home ciities."

    }
  ];
    return (
        <div className="row my-5 justify-content-between p-5">
          {bannerCards.map((bannerCard, i) => <BannerCard key={i} {...bannerCard} />)}
        </div>
    )
}

export default BannerIntro;