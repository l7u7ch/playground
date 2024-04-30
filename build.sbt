ThisBuild / scalaVersion := "3.4.1"

publishTo := Some("GitHub Package Registry" at "https://maven.pkg.github.com/l7u7ch/playground")
publishMavenStyle := true

credentials += Credentials(
  "GitHub Package Registry",
  "maven.pkg.github.com",
  System.getenv("GITHUB_ACTOR"),
  System.getenv("GITHUB_TOKEN")
)
