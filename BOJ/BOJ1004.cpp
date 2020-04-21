#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int dispow(int x1, int y1, int x2, int y2)
{
  return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
}


int main()
{
  int t;
  bool boot = false;
  scanf("%d",&t);

  for (int i = 0 ; i < t ; i++)
  {
    int start_x, start_y, end_x, end_y, n, ans=0;
    scanf("%d %d %d %d %d",&start_x,&start_y,&end_x,&end_y,&n);

    if (boot) {printf("\n");}
    else {boot = true;}

    vector < pair < int , pair <int , int> > > v;
    for (int i = 0 ; i < n ; i++)
    {
      int a, b, c;
      scanf("%d %d %d",&a,&b,&c);
      v.push_back(make_pair(a,make_pair(b,c)));
    }

    for (int i = 0 ; i < n ; i++)
    {
      if ((((dispow(start_x,start_y,v[i].first,v[i].second.first) - v[i].second.second*v[i].second.second) > 0 and (dispow(end_x,end_y,v[i].first,v[i].second.first) - v[i].second.second*v[i].second.second) < 0))
          or (((dispow(start_x,start_y,v[i].first,v[i].second.first) - v[i].second.second*v[i].second.second) < 0 and (dispow(end_x,end_y,v[i].first,v[i].second.first) - v[i].second.second*v[i].second.second) > 0)))
          {ans++;}
    }
    printf("%d",ans);
  }
}
