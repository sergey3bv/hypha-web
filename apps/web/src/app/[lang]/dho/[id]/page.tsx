import { getAccessToken, getDaoDetail } from '@hypha-platform/graphql/rsc';
import { getDictionary, Locale } from '@hypha-platform/i18n';
import { Container, Card, Avatar, AvatarImage, Button, FilterMenu } from '@hypha-platform/ui';
import { Link2Icon, LinkedInLogoIcon, Share2Icon, PersonIcon, ChevronLeftIcon, PlusIcon} from '@radix-ui/react-icons';
import { Text, Link } from '@radix-ui/themes';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hypha-platform/ui/server';

type PageProps = {
  params: { lang: Locale; id: string };
};

type OptionType = {
  label: string,
  value: string
}

type FilterType = {
  value: string,
  options: OptionType[]
}

const discussionsfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' }
  ],
};

const customLogoStyles: React.CSSProperties = {
  width: '128px',
  height: '128px',
  position: 'absolute',
  bottom: '-35px',
  left: '15px',
}

// Temp dummy data
const dummyData = {
  membersCount: 128,
  competedProjectsCount: 58,
  discussionsCount: 18
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
        <Tabs defaultValue="agreements" className="w-full mt-16">
          <TabsList className='w-full'>
            <TabsTrigger value="agreements" className="w-full" variant="ghost">Agreements</TabsTrigger>
            <TabsTrigger value="membership" className="w-full" variant="ghost">Membership</TabsTrigger>
            <TabsTrigger value="treasury" className="w-full" variant="ghost">Treasury</TabsTrigger>
          </TabsList>
          <TabsContent value="agreements">
            <div className='flex justify-between items-center mt-10'>
              <Text className='text-lg'>Discussions | {dummyData.discussionsCount}</Text>
              <div className='flex items-center'>
                <FilterMenu
                  value={discussionsfilterSettings.value}
                  options={discussionsfilterSettings.options}
                />
                <Button className='ml-2' variant="action" size="sm">
                  <PlusIcon className='mr-2'/>
                  Create
                </Button>
              </div>
            </div>
            <Tabs defaultValue="all" className='mt-3'>
              <TabsList>
                <TabsTrigger value="all" variant='outlined'>All</TabsTrigger>
                <TabsTrigger value="open" variant='outlined'>Open</TabsTrigger>
                <TabsTrigger value="closed" variant='outlined'>Closed</TabsTrigger>
              </TabsList>
              <TabsContent value="all">All</TabsContent>
              <TabsContent value="open">Open</TabsContent>
              <TabsContent value="closed">Closed</TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="membership">Membership</TabsContent>
          <TabsContent value="treasury">Treasury</TabsContent>
        </Tabs>
      </Container>
      {/* {t('DHO Dashboard')}
      <pre>{JSON.stringify(dao, null, 2)}</pre> */}
    </div>
  );
}
