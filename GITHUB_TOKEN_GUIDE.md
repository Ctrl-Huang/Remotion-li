# GitHub Personal Access Token 创建指南

由于浏览器暂时无法使用，请按照以下步骤手动创建Token：

## 步骤1：登录GitHub并访问Token设置页面

**方式1：直接访问链接**
打开浏览器，访问：
```
https://github.com/settings/tokens/new
```

**方式2：通过菜单访问**
1. 登录 https://github.com （账号：lxy1346839559@gmail.com）
2. 点击右上角头像
3. 选择 **Settings**（设置）
4. 左侧菜单找到 **Developer settings**（开发者设置）
5. 点击 **Personal access tokens** → **Tokens (classic)**
6. 点击 **Generate new token** → **Generate new token (classic)**

---

## 步骤2：填写Token配置

### Note（备注名称）
```
Remotion-li Project Push
```

### Expiration（过期时间）
选择：**No expiration**（永不过期）
或者：**90 days**（90天，更安全）

### 勾选权限（Scopes）
**只需要勾选以下1个权限**：
- ✅ **repo**（完整的仓库控制权限）
  - 这会自动勾选所有repo相关的子选项

其他权限都不用勾选！

---

## 步骤3：生成并复制Token

1. 滚动到页面底部
2. 点击绿色按钮 **Generate token**
3. 页面会显示一个以 `ghp_` 开头的长字符串
4. **立即复制这个Token**（只显示一次！）

⚠️ **重要**：Token只会显示一次，离开页面后就看不到了！请立即复制保存。

---

## 步骤4：提供Token给我

复制Token后，直接粘贴给我，格式如下：
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

我会用这个Token完成Git推送操作。

---

## 如果忘记复制Token

如果不小心关闭了页面，没关系：
1. 回到 https://github.com/settings/tokens
2. 删除刚才创建的Token
3. 重新创建一个新的

---

## 为什么需要Token？

GitHub在2021年8月后，不再允许用密码推送代码，必须使用Personal Access Token（个人访问令牌）作为密码。这样更安全。

**您准备好了吗？** 请按照上面的步骤创建Token，然后把Token粘贴给我！
