import WallpaperCard from "../components/WallpaperCard";
import MainLayout from "../layouts/MainLayout";

const ExclusiveDesign = () => {
  return (
    <div>
      <MainLayout>
        <main>
          <section className="container my-5">
              <div className="text-center mb-5">
                <h1 className="wallpaperHeading">Exclusive Design</h1>
                <p className="px-lg-5">
                  Explore a curated selection of premium living room interior
                  designs and décor ideas at High Creation. We offer
                  customizable, functional, and stylish solutions to elevate
                  your living space. From modular TV units to wall art and
                  innovative wall designs, find all the inspiration you need to
                  transform your living room. Start browsing today to discover
                  designs that perfectly reflect your personal style.
                </p>
              </div>
            <div className="row g-4 mx-0">
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/office.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="wall"
                  portfolioTitle="Madhuban"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Size"
                  secondValue="12feet"
                  textBtnWallpaper="View Design"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/room.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="wall"
                  portfolioTitle="Forest"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Size"
                  secondValue="12feet"
                  textBtnWallpaper="View Design"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/roombg2.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="wall"
                  portfolioTitle="Pichwai Cow Wallpaper"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Size"
                  secondValue="12feet"
                  textBtnWallpaper="View Design"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/roombg4.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="wall"
                  portfolioTitle="Floral"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Size"
                  secondValue="12feet"
                  textBtnWallpaper="View Design"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/office.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="wall"
                  portfolioTitle="Rajmahal"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Size"
                  secondValue="12feet"
                  textBtnWallpaper="View Design"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/roombg5.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="wall"
                  portfolioTitle="Elephant"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Size"
                  secondValue="12feet"
                  textBtnWallpaper="View Design"
                />
              </div>
            </div>
          </section>
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default ExclusiveDesign;
