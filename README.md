# Praxus Gaming JVS Loading Screen

Static Garry's Mod loading screen prepared for GitHub Pages. It uses one Praxus Gaming logo, the animated Darth Revan video wallpaper in GMod-friendly WebM and MP4 formats, a still poster fallback, a two-track music playlist, responsive JVS styling, and Garry's Mod loading callbacks.

## Publish with GitHub Pages

1. Create a GitHub repository and upload **the contents of this folder** to the repository root.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.
5. After GitHub gives you the public Pages URL, set it as the server's `sv_loadingurl`.

Example server configuration:

```cfg
sv_loadingurl "https://YOUR-NAME.github.io/YOUR-REPOSITORY/"
```

Keep `index.html`, `styles.css`, `wallpaper-fix.css`, `script.js`, `.nojekyll`, and the entire `assets` folder together. The relative paths are already compatible with both project Pages and custom domains.

## Live Garry's Mod data

The page supports `GameDetails`, `SetFilesTotal`, `SetFilesNeeded`, `DownloadingFile`, and `SetStatusChanged`. Garry's Mod will supply server, map, Steam ID, status, filename, and progress information automatically.

Music attempts to autoplay. Garry's Mod should allow it; normal browsers may require the **Enable Music** button once.
