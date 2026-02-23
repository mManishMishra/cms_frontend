const VideoSection = () => {
  return (
    <div className="video">
      <h3>Meet Us</h3>
      <p>
        Let us know more about each other. We can meet over a cup of coffee or
        even online too. We’d like to know what you ’re looking for .
      </p>
      <div className="">
        <iframe
          width="100%"
          height="480"
          src="https://www.youtube.com/embed/OzUkvzyBttA"
          title="Simple &amp; Elegent 3bhk Home Tour @ Dighi | Best Interior Designer in Pune | Kams Designer Zone"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
