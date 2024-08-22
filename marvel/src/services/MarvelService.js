class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=6044d7533b26f6f9e2ca125fc8a68389';
  _baseOffset = 210;
  getRecourse = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getRecourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(this._transformChar);
  }

  getCharacter = async (id) => {
    const res = await this.getRecourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformChar(res.data.results[0]);
  }

  _transformChar = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'Sorry, we could not find any extra data about this character',
      longDescription: char.description ? char.description : 'Sorry, we could not find any extra data about this character',
      thumbnailStyle: (char.thumbnail.path.split('/'))[char.thumbnail.path.split('/').length-1] === 'image_not_available' ? {objectFit: "contain"} : null,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }
}

export default MarvelService;
