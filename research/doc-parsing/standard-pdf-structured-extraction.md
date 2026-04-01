---
layout: page
title: 标准 PDF 高精度结构化提取系统设计
permalink: /research/doc-parsing/standard-pdf-structured-extraction/
module_title: 个人研究
module_path: /research/
parent_title: 文档解析
parent_path: /research/doc-parsing/
description: 面向标准 PDF 的高精度内容提取、结构恢复与文档级校正设计方案。
updated_at: 2026-04-01
---

## 1. 文档目标

本文档定义一套面向标准 PDF 的高精度内容提取系统。系统目标不是简单输出纯文本，而是尽可能恢复 PDF 中的真实内容结构、阅读顺序与文档组织关系，为下游的检索、RAG、知识入库、结构分析、内容重建等任务提供高质量输入。

该系统以原生 PDF 对象提取为基础，以版面理解为中层，以文档级全局校正为核心增强层，最终输出可回溯、可结构化、可复用的文档表示。

## 2. 设计目标

### 2.1 核心目标

系统需要尽可能准确完成以下任务：

1. 提取正文内容，并恢复正确阅读顺序。
2. 区分正文与非正文元素，如页眉、页脚、页码、脚注等。
3. 识别标题，并构建合理的标题层级树。
4. 识别表格，并恢复其结构化表示。
5. 识别图片、图注、表注等，并建立绑定关系。
6. 识别跨页延续内容，如跨页段落、跨页表格、跨页列表。
7. 形成统一的文档级结构化输出。

### 2.2 设计原则

本系统遵循以下原则：

- 原生优先：对标准 PDF，优先使用 PDF 原生文本对象，不以 OCR 作为主路径。
- 结构优先：先保留版面结构与样式信息，再进行语义理解。
- 局部提取，全局修正：页内识别只是初步结果，最终结果由全文一致性校正决定。
- 多层表示：同时保留原始对象层、语义块层、文档树层，支持回溯与修正。
- 元素分治：正文、标题、表格、图像、页眉页脚等采用分类型策略处理。
- 文档级建模：系统关注全文模式，而非只做单页抽取。

## 3. 适用范围

### 3.1 适用对象

本系统适用于以下类型文档：

- 原生文本 PDF
- 可以复制文本的 PDF
- 含真实文本对象、字体信息、坐标信息的 PDF
- 报告、论文、制度文档、说明书、公告、财报等版式文档

### 3.2 不作为主目标的对象

以下对象不属于本设计的主目标场景：

- 纯扫描 PDF
- 图片型 PDF
- OCR 后伪文本层严重错乱的 PDF
- 极端复杂设计型排版文档
- 大量旋转排版、曲线排版的艺术型 PDF

## 4. 总体架构

系统采用分层设计，共分为六个核心层级：

1. 文档输入层
2. 原始对象提取层
3. 页内结构理解层
4. 解析增强层
5. 全局校正层
6. 结构化输出层

整体处理链路如下：

```text
DocumentInput
  -> RawPage[]
  -> PageLayoutResult
  -> Enhanced Candidates
  -> Globally Corrected Objects
  -> SemanticBlock[]
  -> SectionTree / TableObjects / FigureObjects
  -> ParsedDocument
```

## 5. 分层设计

### 5.1 文档输入层

#### 5.1.1 目标

将 PDF 文件转换为系统内部统一处理对象，为后续各层提供标准输入。

#### 5.1.2 输入

- PDF 文件路径
- PDF 二进制流
- 文档唯一 ID
- 可选解析参数

#### 5.1.3 输出

统一文档输入对象 `DocumentInput`。

#### 5.1.4 建议数据结构

```python
from dataclasses import dataclass, field
from typing import Any, Optional

@dataclass
class DocumentMeta:
    doc_id: str
    file_name: str
    page_count: int
    source_path: Optional[str] = None
    extra: dict[str, Any] = field(default_factory=dict)

@dataclass
class DocumentInput:
    meta: DocumentMeta
    raw_pdf_bytes: bytes | None = None
    parse_options: dict[str, Any] = field(default_factory=dict)
```

#### 5.1.5 职责

- 统一文件输入方式
- 记录文档元信息
- 保存原始解析配置
- 向下游提供标准化入口

### 5.2 原始对象提取层

#### 5.2.1 目标

最大限度保留 PDF 底层可观测对象，不做过早语义决策。

#### 5.2.2 提取对象

文本对象至少提取：

- block
- line
- span
- char

并保留：

- text
- bbox
- page_id
- font_name
- font_size
- flags
- color
- direction

图形对象至少提取：

- line
- rect
- curve
- path

并保留：

- bbox
- page_id
- stroke/fill 属性
- 几何点集

图像对象至少提取：

- image bbox
- image 引用
- width / height
- page_id

页面对象至少保留：

- page width
- page height
- rotation
- crop box
- media box

#### 5.2.3 输出

输出统一的页面对象集合。

#### 5.2.4 建议数据结构

```python
from dataclasses import dataclass

@dataclass
class BBox:
    x0: float
    y0: float
    x1: float
    y1: float

@dataclass
class RawChar:
    text: str
    bbox: BBox
    font_name: str
    font_size: float
    flags: int
    color: int

@dataclass
class RawSpan:
    text: str
    bbox: BBox
    font_name: str
    font_size: float
    flags: int
    color: int
    chars: list[RawChar]

@dataclass
class RawLine:
    bbox: BBox
    spans: list[RawSpan]

@dataclass
class RawBlock:
    bbox: BBox
    lines: list[RawLine]
    block_type: str

@dataclass
class RawDrawing:
    bbox: BBox
    drawing_type: str
    points: list[tuple[float, float]]

@dataclass
class RawImage:
    bbox: BBox
    image_id: str
    width: int
    height: int

@dataclass
class RawPage:
    page_idx: int
    width: float
    height: float
    rotation: int
    blocks: list[RawBlock]
    drawings: list[RawDrawing]
    images: list[RawImage]
```

#### 5.2.5 设计要求

- 原始对象要尽可能完整，不在此层删除内容。
- 此层不输出“正文”“标题”等高层语义。
- 为后续页内理解和全局修正保留全部几何依据。

### 5.3 页内结构理解层

这一层以 MinerU 作为底座，用于完成：

- 页面候选区域划分
- 页面列结构识别
- 页内阅读顺序校正与重建
- 页面块级局部语义候选构建

这一层不负责最终语义定型，而是输出：

- `PageRegion`
- `ColumnLayout`
- `LayoutBlock`

供后续解析增强层和全局校正层继续使用。

#### 5.3.1 基础输入约定

建议只依赖两类核心输入：

1. `*_content_list.json`
2. `*_model.json`

其中：

- `content_list` 作为文本与基础块信息主来源，至少可用 `type`、`text`、`text_level`、`bbox`、`page_idx`
- `model.json` 作为几何版面辅助来源，主要提供页面级 `layout_dets`

#### 5.3.2 页面区域划分模块

模块定位：

MinerU 已经能输出复杂布局解析结果，因此这一层不从 PDF 原始对象零开始切页面，而是以 MinerU 的内容块和布局检测框为基础，做页面区域再组织，把离散 block 重组为 `PageRegion`。

实现思路：

1. 构建统一候选块，补充 `width`、`height`、`center_x`、`center_y`、`area`、各方向边缘距离等派生特征。
2. 按页面边缘先做粗分区，得到 `top_band`、`bottom_band`、`left_margin_band`、`right_margin_band`、`main_body_band`。
3. 结合 `layout_dets` 做区域聚合，将表格、图片、文本密集区和边缘候选区显式化。
4. 再按留白和连通性做区域切分，形成多个页内区域。

最终可形成如下候选区域类型：

- `main_text_candidate`
- `table_candidate_region`
- `figure_candidate_region`
- `top_edge_candidate`
- `bottom_edge_candidate`
- `side_edge_candidate`
- `page_number_candidate`

建议数据结构：

```python
from dataclasses import dataclass, field

@dataclass
class PageRegion:
    region_id: str
    page_idx: int
    bbox: BBox
    region_type: str
    block_ids: list[str] = field(default_factory=list)
    score: float = 0.0
    features: dict[str, float | int | str] = field(default_factory=dict)
```

#### 5.3.3 多栏识别模块

推荐先保留接口，默认以单栏处理，但显式建模列结构，为后续顺序校正提供依据。

实现要点：

1. 仅在 `main_text_candidate` 中分析列结构。
2. 统计块的 `x0`、`x1`、`center_x`、`width` 分布。
3. 寻找持续存在的纵向空白带。
4. 在稳定空白带存在时做列聚类。
5. 特别识别“标题跨栏 + 正文双栏”。

建议输出：

```python
@dataclass
class ColumnRange:
    column_id: int
    x0: float
    x1: float

@dataclass
class ColumnLayout:
    page_idx: int
    layout_type: str
    columns: list[ColumnRange]
    gutter_ranges: list[BBox]
    spans_across_columns_block_ids: list[str]
    features: dict[str, float | int | str]
```

其中 `layout_type` 建议取值：

- `single`
- `double`
- `multi`
- `mixed`

#### 5.3.4 阅读顺序重建模块

这里不应直接把 MinerU 的顺序当最终顺序，而应把它视作“初始顺序候选”，在几何规则之上做工程化校正。

排序优先级建议：

1. 先按语义区域排序
2. 再按列排序
3. 再按块排序
4. 再按行排序
5. 最后参考 MinerU 原顺序做冲突消解

可扩展的块结构：

```python
from dataclasses import dataclass, field

@dataclass
class LayoutBlock:
    block_id: str
    page_idx: int
    bbox: BBox
    text: str
    lines: list[RawLine]
    reading_order: int
    mineru_order: int
    region_type: str
    column_id: int
    is_span_across_columns: bool = False
    candidate_labels: list[str] = field(default_factory=list)
    features: dict[str, float | int | str] = field(default_factory=dict)
```

#### 5.3.5 局部语义候选模块

MinerU 的类型信息更适合作为弱标签，而不是最终定类结果。建议结合几何与样式特征，为每个块生成候选标签和分数。

重点候选包括：

- `title_candidate`
- `paragraph_candidate`
- `list_candidate`
- `table_candidate`
- `figure_candidate`
- `caption_candidate`
- `header_footer_candidate`
- `footnote_candidate`

建议将候选标签升级为带分数结构：

```python
@dataclass
class CandidateLabel:
    label: str
    score: float
    source: str

@dataclass
class LayoutBlock:
    block_id: str
    page_idx: int
    bbox: BBox
    text: str
    lines: list[RawLine]
    reading_order: int
    mineru_order: int
    region_type: str
    column_id: int
    is_span_across_columns: bool = False
    candidate_labels: list[CandidateLabel] = field(default_factory=list)
    features: dict[str, float | int | str] = field(default_factory=dict)
```

#### 5.3.6 建议模块拆分

```python
class MinerUPageAdapter:
    """把 MinerU 的 content_list / model.json 转成内部统一块结构"""

class PageRegionBuilder:
    """根据块和布局框构建 PageRegion"""

class ColumnLayoutResolver:
    """根据正文候选块识别页面列结构"""

class ReadingOrderResolver:
    """结合区域、列和几何关系重建页内阅读顺序"""

class LocalSemanticCandidateBuilder:
    """为每个 LayoutBlock 生成候选标签和分数"""
```

处理链路如下：

```text
mineru_output
  -> MinerUPageAdapter
  -> PageRegionBuilder
  -> ColumnLayoutResolver
  -> ReadingOrderResolver
  -> LocalSemanticCandidateBuilder
  -> PageLayoutResult
```

核心判断可以概括为：

- MinerU 提供块、框、初始顺序、弱语义
- 5.3 层负责把这些结果组织成显式的区域、列和候选语义对象

### 5.4 解析增强层

该层的三类核心动作：

1. 候选排除
2. 候选提纯
3. 候选关联

目标是在页内结构理解层的结果基础上，结合 MinerU 块级结果与原始 PDF 的字体、样式、线条、间距等信息，对复杂对象做专项增强。

#### 5.4.1 段落候选增强模块

目标：

- 判断当前文本块是否应视为段落候选
- 判断相邻文本块是否属于同一段

判断信号包括：

- 字体大小是否接近正文主字体范围
- 字体样式是否接近正文主样式
- 是否处于主体正文区域
- 是否明显呈现表格式排列
- 相邻块间距是否连续
- 左边界是否对齐
- 首行是否存在缩进或留白
- 当前块末尾是否闭合
- 下一块是否更像续写而非新段起始
- 文本语义是否连续

输出：

- `paragraph_candidate_refined`
- `paragraph_merge_candidate`

#### 5.4.2 标题候选增强模块

增强信号包括：

- 相对正文主字体具有更大的字号
- 字体样式明显不同于正文
- 独占一行或局部独占性较强
- 上下留白明显大于正文行间距
- 文本长度较短
- 编号模式明显
- 对齐方式具有特殊性
- 位于局部内容起始位置
- 与下方正文形成稳定的标题-正文关系
- 位于顶部区域但具有跨栏标题特征

输出：

- `heading_candidate_refined`

#### 5.4.3 表格候选增强与候选绑定模块

增强与关联信号包括：

- 区域内文本呈现规则对齐或局部网格分布
- `x / y` 方向存在明显聚类关系
- 短文本块密集排列
- 与表题候选块相邻
- 与表注候选块相邻
- 附近存在“表”“Table”“续表”等模式文本
- 几何位置具有明显关联性

输出：

- `table_region_candidate_refined`
- `table_caption_candidate_refined`
- `table_note_candidate_refined`
- `table_binding_candidate`
- `is_cross_page_table_candidate`

#### 5.4.4 图像与说明文字候选绑定模块

绑定依据包括：

- 图像区域上下邻近的短文本块
- 文本是否匹配“图”“Figure”等模式
- 文本块与图像区域的几何距离
- 文本块位置是否符合常见图注分布规律
- 是否处于同一局部内容单元
- 候选编号是否具有关联性
- 图注文本在字号、样式上是否区别于正文主流

输出：

- `figure_region_candidate_refined`
- `caption_candidate_refined`
- `figure_binding_candidate`

#### 5.4.5 非正文候选增强模块

增强信号包括：

- 位于页面边缘带或边界附近
- 字号明显小于正文主字号
- 文本长度较短或信息密度较低
- 与主体正文区域明显分离
- 符合页码、脚注编号、来源说明等常见模式
- 在局部布局中不参与正文连续阅读流
- 存在固定文本模板或固定样式特征

输出：

- `header_footer_candidate_refined`
- `page_number_candidate_refined`
- `footnote_candidate_refined`
- `side_note_candidate_refined`

#### 5.4.6 输出结果

建议保持“候选增强与候选关联”属性，不直接替代最终语义定类。可输出：

- 段落增强候选
- 段落合并候选
- 标题增强候选
- 表格相关增强候选
- 图像相关增强候选
- 非正文增强候选
- 表格与说明文字候选关联
- 图像与说明文字候选关联

### 5.5 全局校正层

这一层通过全文统计和跨页建模，对前面各层的候选结果进行统一修正，是整体效果提升的关键。

#### 5.5.1 页眉页脚页码识别模块

目标：识别跨页重复的非正文元素。

核心信号：

- 相似位置重复出现
- 文本内容重复或模板一致
- 奇偶页镜像对称
- 与页边距离稳定
- 页码规则匹配

输出：

- `header blocks`
- `footer blocks`
- `page number blocks`

#### 5.5.2 正文主模板识别模块

目标：统计全文正文模式，反向校正文正文块与异常块。

统计项包括：

- 主字号
- 主字体
- 主行高
- 主段宽
- 主左边界
- 主体区域范围
- 正文平均密度

输出：`BodyTemplate`

#### 5.5.3 标题层级统一模块

目标：对所有标题候选进行全文聚类与层级归一化。

可用信号包括：

- 字号层级
- 字体粗细
- 编号模式
- 上下留白
- 对齐方式
- 出现频率
- 与正文相邻关系
- 与目录项匹配关系

输出：

- `heading level 1/2/3/...`
- 标题树

#### 5.5.4 跨页延续恢复模块

目标：恢复被分页打断的逻辑对象。

处理对象包括：

- 跨页段落
- 跨页表格
- 跨页列表
- 跨页图注表注
- 参考文献断裂项

判断信号包括：

- 上页末尾未闭合
- 下页顶部缺独立起始特征
- 字体与左边界一致
- 表格列结构延续
- “续表”等提示
- 前后页面区域兼容

输出：合并后的逻辑块。

#### 5.5.5 目录互证模块

若存在目录，可用作结构校正信号，用于：

- 验证标题候选
- 修正标题编号
- 修正层级
- 补充章节边界

#### 5.5.6 全文一致性修正模块

目标：对全文结果做最后一次规则化修正。

修正项包括：

- 标题层级断裂
- 段落误拆/误并
- 页眉页脚漏删
- 图注表注误绑定
- 表格边界偏移
- 非正文误入正文流

### 5.6 结构化输出层

目标不是输出单一字符串，而是输出多层次、多用途的文档表示。

#### 5.6.1 原始对象层

用于回溯与审计：

- `raw pages`
- `raw blocks`
- `raw lines`
- `raw spans`
- `drawings`
- `images`

#### 5.6.2 语义块层

输出语义化块对象：

- `heading`
- `paragraph`
- `list_item`
- `table`
- `figure`
- `caption`
- `header`
- `footer`
- `page_number`
- `footnote`

建议结构：

```python
from dataclasses import dataclass
from typing import Any

@dataclass
class SemanticBlock:
    block_id: str
    page_idx: int
    bbox: BBox
    block_type: str
    text: str
    reading_order: int
    section_path: list[str]
    style: dict[str, Any]
    extra: dict[str, Any]
```

#### 5.6.3 文档树层

输出章节树：

```python
@dataclass
class SectionNode:
    title: str
    level: int
    page_idx: int
    children: list["SectionNode"]
    content_blocks: list[str]
```

#### 5.6.4 专项结构层

包括：

- 表格结构
- 图片与图注绑定
- 表格与表题绑定
- 脚注列表
- 目录项列表
- 参考文献列表

表格建议输出：

```python
@dataclass
class TableCell:
    row_start: int
    row_end: int
    col_start: int
    col_end: int
    text: str
    bbox: BBox

@dataclass
class TableObject:
    table_id: str
    page_indices: list[int]
    bbox: BBox
    caption: str | None
    cells: list[TableCell]
    extra: dict[str, Any]
```

## 6. 模块划分设计

建议系统内部划分如下：

```text
pdf_parser/
├── core/
│   ├── document_models.py
│   ├── bbox_utils.py
│   ├── constants.py
│   └── enums.py
├── input/
│   ├── document_loader.py
│   └── parse_options.py
├── extractors/
│   ├── raw_text_extractor.py
│   ├── drawing_extractor.py
│   ├── image_extractor.py
│   └── page_meta_extractor.py
├── layout/
│   ├── region_detector.py
│   ├── column_detector.py
│   ├── reading_order.py
│   └── block_builder.py
├── detectors/
│   ├── paragraph_detector.py
│   ├── heading_detector.py
│   ├── table_detector.py
│   ├── figure_detector.py
│   ├── caption_detector.py
│   ├── header_footer_detector.py
│   └── footnote_detector.py
├── global_fix/
│   ├── body_template_analyzer.py
│   ├── heading_level_resolver.py
│   ├── cross_page_merger.py
│   ├── toc_aligner.py
│   └── consistency_fixer.py
├── builders/
│   ├── semantic_block_builder.py
│   ├── section_tree_builder.py
│   ├── table_builder.py
│   └── figure_binding_builder.py
├── output/
│   ├── json_exporter.py
│   ├── markdown_exporter.py
│   └── debug_exporter.py
└── pipeline/
    └── parse_pipeline.py
```

## 7. 核心数据流设计

整个系统数据流应遵循“由粗到细、由局部到全局”的过程。

### 7.1 处理顺序

```text
DocumentInput
  -> RawPage[]
  -> LayoutBlock[]
  -> Candidate Objects
  -> Globally Corrected Objects
  -> SemanticBlock[]
  -> SectionTree / TableObjects / FigureObjects
  -> Final Structured Document
```

### 7.2 阶段特征

- 前期阶段尽量保留信息，不做激进删除。
- 中期阶段生成候选，不轻易做单页最终判决。
- 后期阶段依据全文模式做统一修正。
- 最终阶段输出结构化多视图结果。

## 8. 关键判定规则设计

### 8.1 正文判定规则

正文一般具有如下共性：

- 出现频率高
- 字号接近全文主流
- 字体稳定
- 分布于主体区域
- 行宽与段宽稳定
- 与相邻块形成连续阅读链

正文判定应基于“全文模板匹配得分”，而非单一阈值。

### 8.2 标题判定规则

标题判定信号建议包括：

- 字号偏大
- 加粗
- 独占一行
- 上方或下方留白更大
- 对齐特殊
- 编号模式明确
- 与正文形成父子关系
- 全文存在相似兄弟标题

最终标题级别应由全文聚类决定。

### 8.3 表格判定规则

表格识别建议结合：

- 显式线条网格
- 隐式文本列对齐
- 行列分布规律
- 文本密度矩形区域
- 表题邻接
- 多页列结构延续

表格检测应与正文流解耦。

### 8.4 页眉页脚页码判定规则

识别策略：

- 位置稳定
- 多页重复
- 短文本
- 信息密度低
- 与主体区分离
- 奇偶页镜像一致
- 页码正则匹配

### 8.5 跨页段落判定规则

跨页段落恢复信号：

- 上页末尾句子未闭合
- 下页首行不是新段特征
- 左边界与行距连续
- 字体不变
- 所属列一致
- 非标题非表格起始

### 8.6 跨页表格判定规则

跨页表格恢复信号：

- 上页底部为表格区域
- 下页顶部存在相同列结构
- 列边界一致
- 字号风格一致
- 表头重复或存在续表标记
- 两部分之间无新标题打断

## 9. 输出 Schema 设计建议

最终可定义统一输出对象：

```python
@dataclass
class ParsedDocument:
    meta: DocumentMeta
    pages: list[RawPage]
    semantic_blocks: list[SemanticBlock]
    sections: list[SectionNode]
    tables: list[TableObject]
    figures: list[dict[str, Any]]
    headers: list[SemanticBlock]
    footers: list[SemanticBlock]
    page_numbers: list[SemanticBlock]
    toc_items: list[dict[str, Any]]
    references: list[dict[str, Any]]
    debug_info: dict[str, Any]
```

## 10. 质量目标定义

系统质量不应只用“能不能提取出文本”衡量，而应至少从以下维度评估：

1. 正文纯净度
2. 阅读顺序正确率
3. 标题层级正确率
4. 段落恢复准确率
5. 表格结构恢复质量
6. 图文绑定质量
7. 跨页恢复质量

具体含义如下：

- 正文纯净度：页眉页脚、页码、脚注混入正文的比例要低。
- 阅读顺序正确率：多栏与复杂布局下的正文顺序应尽可能正确。
- 标题层级正确率：标题识别和层级树应稳定。
- 段落恢复准确率：不应频繁误拆段、误并段。
- 表格结构恢复质量：行列关系、表题绑定、跨页续表处理应尽可能正确。
- 图文绑定质量：图片与图注、表格与表题应能稳定关联。
- 跨页恢复质量：对分页打断内容的合并要尽量准确。

## 11. 设计上的关键取舍

### 11.1 为什么不直接输出纯文本

因为纯文本会丢掉：

- 坐标
- 层级
- 类型
- 版面关系
- 回溯能力

对于高质量提取系统，这是不可接受的。

### 11.2 为什么必须保留原始对象层

因为后续的任何误判修正，都需要回到最底层几何与样式信息。没有原始对象层，很多问题无法做二次校正。

### 11.3 为什么全局校正是必要的

很多关键信息本质上是文档级模式，而不是页级模式，例如：

- 页眉页脚
- 标题层级
- 正文模板
- 跨页延续
- 目录互证

## 12. 推荐的处理策略总结

本系统的最优策略可以概括为五个阶段：

1. 第一阶段：完整提取  
   提取原始对象，不做过早裁剪。
2. 第二阶段：页内初判  
   完成区域划分、列识别、顺序重建、候选分类。
3. 第三阶段：专项增强  
   加强段落、标题、表格、图注等复杂元素识别。
4. 第四阶段：全文校正  
   通过跨页模式、模板统计和一致性约束修正初判结果。
5. 第五阶段：结构化输出  
   以文档树、语义块、专项对象三种形式统一输出。

## 13. 最终结论

标准 PDF 的最优提取系统，不应被理解为“一个文本提取器”，而应被设计为一个文档级结构恢复系统。

它的核心不是“把字拿出来”，而是：

- 把对象拿全
- 把顺序理顺
- 把类型分开
- 把跨页接上
- 把全文统一
- 把结构输出

因此，这套系统的本质可以定义为：

一种以原生 PDF 对象为基础，以页内版面理解为中层，以文档级全局一致性校正为核心的标准 PDF 高精度结构化提取系统。
