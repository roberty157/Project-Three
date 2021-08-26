import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faCity, faSearch } from "@fortawesome/free-solid-svg-icons";
import BannerCard from "./BannerCard";
const BannerIntro = () => {
  let bannerCards = [
    {
      headerIcon: <FontAwesomeIcon icon={faSearch} />,
      title: "Search",
      text: "Quality of Life Scores for US Cities"
    },
    {
      headerIcon: <FontAwesomeIcon icon={faChartBar} />,
      title: "Analyze",
      text: "Healthcare, Taxation, Education, Housing Cost of Living, Safety, Environmental Quality, & Economy"

    },
    {
      headerIcon: <FontAwesomeIcon icon={faCity} />,
      title: "Compare",
      text: "Scores: Home City vs. Future Home City"

    }
  ];
    return (
        <div className="row my-5 justify-content-between p-5">
          {bannerCards.map((bannerCard, i) => <BannerCard key={i} {...bannerCard} />)}
        </div>
    )
}

export default BannerIntro;