import { getAccessToken, getDaoDetail } from '@hypha-platform/graphql/rsc';
import { getDictionary, Locale } from '@hypha-platform/i18n';
import { Container, Card, Avatar, AvatarImage, Button } from '@hypha-platform/ui';
import { Link2Icon, LinkedInLogoIcon, Share2Icon, PersonIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { Text, Link } from '@radix-ui/themes';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PageProps = {
  params: { lang: Locale; id: string };
};

const customLogoStyles: React.CSSProperties = {
  width: '128px',
  height: '128px',
  position: 'absolute',
  bottom: '-35px',
  left: '15px',
}

const memberButtonBlockCustomStyles: React.CSSProperties = {
  position: 'absolute',
  bottom: '-35px',
  right: '15px',
}

// Temp dummy data
const dummyData = {
  membersCount: 128,
  competedProjectsCount: 58
}

const alreadyMember = true;

export default async function Index({
  params: { lang, id: daoSlug },
}: PageProps) {
  const newtoken = await getAccessToken();
  const t = await getDictionary(lang);
  const dao = await getDaoDetail({ token: newtoken.accessJWT, daoSlug });
  return (
    <div>
      <Container>
        <div className='mb-6 flex items-center'>
          <Link href={`/${lang}/my-spaces`} className='cursor-pointer flex items-center'>
            <ChevronLeftIcon width={16} height={16}/>
            <Text className='text-sm'>My Spaces</Text>
          </Link>
          <Text className='text-sm text-gray-400 ml-1'> / {dao.title}</Text>
        </div>
        <Card className='relative'>
          <img className="rounded-xl max-h-[270px] w-full object-cover" src={dao.logo}></img>
          <Avatar style={customLogoStyles} className='border-4'>
            <AvatarImage src={dao.logo} alt="logo" />
          </Avatar>
        </Card>
        <div className='flex justify-end mt-2'>
          <Button asChild variant="ghost" size="sm" className="rounded-lg justify-start p-1 cursor-pointer">
            <Share2Icon width={28} height={28}/>
          </Button>
          <Button disabled={alreadyMember} className='ml-2 rounded-lg' variant={alreadyMember ? "outline" : "action"} size="sm">
            <PersonIcon className='mr-2' width={16} height={16}/>
            {alreadyMember ? (<Text>Already member</Text>) : (<Text>Become member</Text>)}
          </Button>
        </div>
        <div className='mt-4'>
          <Text className='text-3xl'>{dao.title}</Text>
        </div>
        <div className='flex gap-6'>
          <Button asChild variant="ghost" className="rounded-lg justify-start text-gray-400 px-0 cursor-pointer">
            <div>
              <LinkedInLogoIcon width={16} height={16}/>
              <Text className="ml-1 text-xs">HyphaDAO</Text>
            </div>
          </Button>
          <Button asChild variant="ghost" className="rounded-lg justify-start text-gray-400 px-0 cursor-pointer">
            <div>
              <FontAwesomeIcon className="w-4" color="bg-primary-foreground" icon={faXTwitter}></FontAwesomeIcon>
              <Text className="ml-1 text-xs">@HyphaDAO</Text>
            </div>
          </Button>
          <Button asChild variant="ghost" className="rounded-lg justify-start text-gray-400 px-0 cursor-pointer">
            <div>
              <Link2Icon width={16} height={16}/>
              <Text className="ml-1 text-xs">hypha.earth</Text>
            </div>
          </Button>
        </div>
        <div className='mt-6'>
          <Text className='text-sm'>{dao.description}</Text>
        </div>
        <div className="flex flex-grow gap-2 text-xs items-center mt-6">
          <div className="flex">
            <div className="font-bold">{dummyData.membersCount}</div>
            <div className="text-gray-500 ml-1 text-xs">Members</div>
          </div>
          <div className="flex ml-3">
            <div className="font-bold">{dummyData.competedProjectsCount}</div>
            <div className="text-gray-500 ml-1 text-xs">Completed projects</div>
          </div>
        </div>
      </Container>
      {/* {t('DHO Dashboard')}
      <pre>{JSON.stringify(dao, null, 2)}</pre> */}
    </div>
  );
}
