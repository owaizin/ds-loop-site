import random, math
U=10
def truchet(cols, rows, s=40, seed=7):
    rnd=random.Random(seed)
    return [[rnd.random()<0.5 for c in range(cols)] for r in range(rows)]
def truchet_lines(grid, s=40):
    """returns list of arcs: (cx,cy,start_pt,end_pt) and path string"""
    arcs=[]; h=s/2
    for r,row in enumerate(grid):
        for c,o in enumerate(row):
            x,y=c*s,r*s
            if o: # arcs at TL and BR
                arcs.append(((x+h,y),(x,y+h)))          # TL: top-mid -> left-mid
                arcs.append(((x+s,y+h),(x+h,y+s)))      # BR: right-mid -> bottom-mid
            else: # TR and BL
                arcs.append(((x+h,y),(x+s,y+h)))        # TR
                arcs.append(((x,y+h),(x+h,y+s)))        # BL
    return arcs
def arc_d(a,s=40):
    (x1,y1),(x2,y2)=a; r=s/2
    return f'M{x1:g} {y1:g}A{r:g} {r:g} 0 0 0 {x2:g} {y2:g}'
def components(arcs):
    par={}
    def f(p):
        par.setdefault(p,p)
        while par[p]!=p: par[p]=par[par[p]]; p=par[p]
        return p
    for a,b in arcs: par[f(a)]=f(b)
    groups={}
    for i,(a,b) in enumerate(arcs): groups.setdefault(f(a),[]).append(i)
    return list(groups.values())
def closed(comp, arcs):
    from collections import Counter
    cnt=Counter()
    for i in comp: cnt[arcs[i][0]]+=1; cnt[arcs[i][1]]+=1
    return all(v==2 for v in cnt.values())
def chain(comp, arcs, s=40):
    """order arcs into one continuous path"""
    adj={}
    for i in comp:
        a,b=arcs[i]; adj.setdefault(a,[]).append((i,b)); adj.setdefault(b,[]).append((i,a))
    start=arcs[comp[0]][0]; used=set(); p=start; d=f'M{p[0]:g} {p[1]:g}'; r=s/2
    while True:
        nxt=[(i,q) for i,q in adj[p] if i not in used]
        if not nxt: break
        i,q=nxt[0]; used.add(i)
        # sweep: determine via cross product around center
        a,b=arcs[i]
        # center is the tile corner shared; compute
        cx = a[0] if a[0] in (round(a[0]/s)*s,) else b[0]
        cand=[(x,y) for x in (min(a[0],b[0]),max(a[0],b[0])) for y in (min(a[1],b[1]),max(a[1],b[1]))]
        cen=[c for c in cand if abs(math.dist(c,a)-r)<1e-6 and abs(math.dist(c,b)-r)<1e-6][0]
        cr=(p[0]-cen[0])*(q[1]-cen[1])-(p[1]-cen[1])*(q[0]-cen[0])
        sweep=1 if cr>0 else 0
        d+=f'A{r:g} {r:g} 0 0 {sweep} {q[0]:g} {q[1]:g}'; p=q
    return d+'Z'
def two_tone(grid, s=40, c0='#080512', c1='#110D20'):
    out=[]; disc=[]; h=s/2
    for r,row in enumerate(grid):
        for c,o in enumerate(row):
            x,y=c*s,r*s
            ptl=(r+c)%2  # parity of TL vertex
            if o:
                band = 1-ptl; corner=ptl
                out.append(f'<rect x="{x}" y="{y}" width="{s}" height="{s}" fill="{[c0,c1][band]}" stroke="{[c0,c1][band]}" stroke-width="1.4"/>')
                col=[c0,c1][corner]
                disc.append(f'<path d="M{x} {y}H{x+h}A{h} {h} 0 0 1 {x} {y+h}Z" fill="{col}" stroke="{col}" stroke-width="1.4"/>')
                disc.append(f'<path d="M{x+s} {y+s}H{x+h}A{h} {h} 0 0 1 {x+s} {y+h}Z" fill="{col}" stroke="{col}" stroke-width="1.4"/>')
            else:
                ptr=1-ptl; band=1-ptr; corner=ptr
                out.append(f'<rect x="{x}" y="{y}" width="{s}" height="{s}" fill="{[c0,c1][band]}" stroke="{[c0,c1][band]}" stroke-width="1.4"/>')
                col=[c0,c1][corner]
                disc.append(f'<path d="M{x+s} {y}V{y+h}A{h} {h} 0 0 1 {x+h} {y}Z" fill="{col}" stroke="{col}" stroke-width="1.4"/>')
                disc.append(f'<path d="M{x} {y+s}V{y+h}A{h} {h} 0 0 1 {x+h} {y+s}Z" fill="{col}" stroke="{col}" stroke-width="1.4"/>')
    return ''.join(out)+''.join(disc)
def echo(n=6, step=20, open_gap=True):
    """concentric D outlines around the mark (centerline), each opening at bottom-left like the mark"""
    ps=[]
    for k in range(1,n+1):
        a=k*step
        x0,y0,x1,y1=5-a,5-a,85+a,85+a
        rl=5+a; rr=30+a
        d=(f'M{x0} {y1-rl}V{y0+rl}A{rl} {rl} 0 0 1 {x0+rl} {y0}H{x1-rr}A{rr} {rr} 0 0 1 {x1} {y0+rr}'
           f'V{y1-rr}A{rr} {rr} 0 0 1 {x1-rr} {y1}H{x0+rl}A{rl} {rl} 0 0 1 {x0} {y1-rl}Z')
        ps.append(d)
    return ps
