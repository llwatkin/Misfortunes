import { Devvit, useState } from '@devvit/public-api';

/*
 * Import Menu Actions
 */
import { installApp } from './actions/installApp.js';

type PageProps = {
  setPage: (page: string) => void;
}

const HomePage = ({ setPage }: PageProps) => (
  <vstack height="100%" width="100%" gap="medium" alignment="center middle">
    <image
      url="Misfortunes_Icon_Transparent.png"
      description="Icon"
      imageHeight={256}
      imageWidth={256}
      height="48px"
      width="48px"
    />
    <text size="xxlarge">{'Misfortunes'}</text>
    <hstack gap="medium">
      <button appearance="primary" onPress={() => setPage('create')}>
        Create
      </button>
      <button appearance="primary" onPress={() => setPage('open')}>
        Open
      </button>
    </hstack>
  </vstack>
);

const CreatePage = ({ setPage }: PageProps) => (
  <vstack height="100%" width="100%" gap="medium" alignment="center middle">
    <image
      url="Misfortunes_Icon_Transparent.png"
      description="Icon"
      imageHeight={256}
      imageWidth={256}
      height="48px"
      width="48px"
    />
    <text size="xxlarge">{'Create a Misfortune'}</text>
    <hstack gap="medium">
      <button appearance="primary" onPress={() => setPage('home')}>
        Home
      </button>
    </hstack>
  </vstack>
);

const OpenPage = ({ setPage }: PageProps) => (
  <vstack height="100%" width="100%" gap="medium" alignment="center middle">
    <image
      url="Misfortunes_Icon_Transparent.png"
      description="Icon"
      imageHeight={256}
      imageWidth={256}
      height="48px"
      width="48px"
    />
    <text size="xxlarge">{'Open a Misfortune'}</text>
    <hstack gap="medium">
      <button appearance="primary" onPress={() => setPage('home')}>
        Home
      </button>
    </hstack>
  </vstack>
);

/*
 * Plugins
 */
Devvit.configure({
  redditAPI: true,
});

/*
 * Custom Post
 */
Devvit.addCustomPostType({
  name: 'Misfortunes',
  description: 'Create, Open, Share',
  height: 'regular',
  render: (_context) => {
    const [page, setPage] = useState('home');

    let currentPage;
    switch (page) {
      case 'home':
        currentPage = <HomePage setPage={setPage} />;
        break;
      case 'create':
        currentPage = <CreatePage setPage={setPage} />;
        break;
      case 'open':
        currentPage = <OpenPage setPage={setPage} />;
        break;
      default:
        currentPage = <HomePage setPage={setPage} />;
    }
    
    return (
      <blocks>
        {currentPage}
      </blocks>
    );
  },
});

/*
 * Perform Menu Actions
 */
Devvit.addMenuItem(installApp);

export default Devvit;